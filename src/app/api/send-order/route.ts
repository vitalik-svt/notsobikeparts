// src/app/api/send-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createOrderSuccessToken, ORDER_SUCCESS_COOKIE } from '@/utils/orderSuccessToken';
import { resolveOrderItemName } from '@/utils/orderItemName';
import { loadSkuNamesDictionary, loadTopcapsDictionary } from './skuNames';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not set on the server' },
        { status: 500 }
      );
    }
    if (!process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'ADMIN_EMAIL is not set on the server' },
        { status: 500 }
      );
    }

    let orderSuccessToken: string;
    try {
      // Fail fast in production if token secret is not configured.
      orderSuccessToken = createOrderSuccessToken();
    } catch (error) {
      return NextResponse.json(
        {
          error: 'ORDER_SUCCESS_SECRET is not set on the server',
          details: error instanceof Error ? error.message : 'Unknown token error',
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { userFormData, items, totalPrice, locale } = body;
    const skuNamesDictionary = loadSkuNamesDictionary(locale);
    const topcapsDictionary = loadTopcapsDictionary(locale);
    const resolveDisplayName = (item: { skuId?: string; productSection: string; productKey: string; }) => resolveOrderItemName({
      skuId: item.skuId,
      productSection: item.productSection as never,
      productKey: item.productKey as never,
      skuName: item.skuId ? skuNamesDictionary[item.skuId] : undefined,
      fallbackName: item.productSection === 'topcap' && item.productKey === 'custom' ? topcapsDictionary['topcaps.custom.name'] : undefined,
    });
    const escapedName = escapeHtml(userFormData?.name);
    const escapedEmail = escapeHtml(userFormData?.email);
    const escapedPhone = escapeHtml(userFormData?.phone);
    const escapedDeliveryMethod = escapeHtml(userFormData?.deliveryMethod);
    const escapedComment = userFormData?.comment ? escapeHtml(userFormData.comment) : '';
    const escapedTotalPrice = escapeHtml(totalPrice);

    // Валидация данных
    if (!userFormData?.email || !userFormData?.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const from =
      process.env.RESEND_FROM ??
      'notsobikeparts <noreply@notsobikeparts.com>';

    // HTML для таблицы товаров в письме покупателю
    const customerItemsHtml = items
      .map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${escapeHtml(resolveDisplayName(item))}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${escapeHtml(item.quantity)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${escapeHtml(item.price)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${escapeHtml(item.subtotal)}</td>
      </tr>
    `
      )
      .join('');

    // HTML для таблицы товаров в письме администратору
    const adminItemsHtml = items
      .map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${escapeHtml(item.skuId || '—')}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${escapeHtml(resolveDisplayName(item))}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${escapeHtml(item.quantity)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${escapeHtml(item.price)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${escapeHtml(item.subtotal)}</td>
      </tr>
    `
      )
      .join('');

    // Общий HTML блок с деталями заказа для покупателя
    const customerOrderDetailsHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h3 style="color: #555; border-bottom: 2px solid #eee; padding-bottom: 10px;">Данные покупателя</h3>
        <table style="width: 100%; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 150px;">Имя:</td>
            <td style="padding: 8px;">${escapedName}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${escapedEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Телефон:</td>
            <td style="padding: 8px;">${escapedPhone}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Способ доставки:</td>
            <td style="padding: 8px;">${escapedDeliveryMethod}</td>
          </tr>
          ${userFormData.comment
        ? `<tr>
            <td style="padding: 8px; font-weight: bold;">Комментарий:</td>
            <td style="padding: 8px;">${escapedComment}</td>
          </tr>`
        : ''
      }
        </table>
        
        <h3 style="color: #555; border-bottom: 2px solid #eee; padding-bottom: 10px;">Товары</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Товар</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Кол-во</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">Цена</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${customerItemsHtml}
          </tbody>
        </table>
        
        <div style="text-align: right; font-size: 18px; font-weight: bold; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          Итого без учета доставки: ${escapedTotalPrice}
        </div>
      </div>
    `;

    // Общий HTML блок с деталями заказа для администратора
    const adminOrderDetailsHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h3 style="color: #555; border-bottom: 2px solid #eee; padding-bottom: 10px;">Данные покупателя</h3>
        <table style="width: 100%; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 150px;">Имя:</td>
            <td style="padding: 8px;">${escapedName}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${escapedEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Телефон:</td>
            <td style="padding: 8px;">${escapedPhone}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Способ доставки:</td>
            <td style="padding: 8px;">${escapedDeliveryMethod}</td>
          </tr>
          ${userFormData.comment
        ? `<tr>
            <td style="padding: 8px; font-weight: bold;">Комментарий:</td>
            <td style="padding: 8px;">${escapedComment}</td>
          </tr>`
        : ''
      }
        </table>

        <h3 style="color: #555; border-bottom: 2px solid #eee; padding-bottom: 10px;">Товары</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">SKU ID</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">SKU имя</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Кол-во</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">Цена</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${adminItemsHtml}
          </tbody>
        </table>

        <div style="text-align: right; font-size: 18px; font-weight: bold; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          Итого без учета доставки: ${escapedTotalPrice}
        </div>
      </div>
    `;

    // HTML письма для покупателя
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #333; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">notsobikeparts</h1>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #333;">Спасибо за ваш заказ!</h2>
          <p style="font-size: 16px; line-height: 1.6;">Здравствуйте, ${escapedName}!</p>
          <p style="font-size: 16px; line-height: 1.6;">Мы получили ваш заказ и скоро свяжемся с вами для подтверждения деталей.</p>
          
          ${customerOrderDetailsHtml}
          
          <p style="color: #666; margin-top: 30px; font-size: 14px; line-height: 1.6;">
            С уважением, Виталик из notsobikeparts<br/>
          </p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>Это автоматическое письмо. Пожалуйста, не отвечайте на него.</p>
        </div>
      </div>
    `;

    // HTML письма для администратора
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #d9534f; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">🔔 Новый заказ!</h1>
        </div>
        
        <div style="padding: 30px 20px;">
          ${adminOrderDetailsHtml}
        </div>
      </div>
    `;

    // Отправка письма покупателю
    const customerEmail = await resend.emails.send({
      from,
      to: userFormData.email,
      replyTo: process.env.ADMIN_EMAIL,
      subject: 'Подтверждение заказа из notsobikeparts',
      html: customerEmailHtml,
    });
    if (customerEmail.error) {
      return NextResponse.json(
        { error: 'Resend (customer)', details: customerEmail.error },
        { status: 502 }
      );
    }

    // Отправка письма администратору
    const adminEmail = await resend.emails.send({
      from,
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 Новый заказ от ${userFormData.name}`,
      html: adminEmailHtml,
      replyTo: userFormData.email, // Можно сразу ответить клиенту
    });
    if (adminEmail.error) {
      return NextResponse.json(
        { error: 'Resend (admin)', details: adminEmail.error },
        { status: 502 }
      );
    }

    console.log('Emails sent:', { customerEmail, adminEmail });

    const response = NextResponse.json({
      success: true,
      customerEmailId: customerEmail.data?.id,
      adminEmailId: adminEmail.data?.id,
    });

    response.cookies.set(ORDER_SUCCESS_COOKIE, orderSuccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 15 * 60,
    });

    return response;

  } catch (error) {
    console.error('Email send error:', error);

    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}