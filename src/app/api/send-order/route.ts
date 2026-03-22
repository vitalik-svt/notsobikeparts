// src/app/api/send-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userFormData, items, totalPrice } = body;

    // Валидация данных
    if (!userFormData?.email || !userFormData?.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // HTML для таблицы товаров
    const itemsHtml = items
      .map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.name || item.productSection}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.price}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.subtotal}</td>
      </tr>
    `
      )
      .join('');

    // Общий HTML блок с деталями заказа
    const orderDetailsHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h3 style="color: #555; border-bottom: 2px solid #eee; padding-bottom: 10px;">Данные покупателя</h3>
        <table style="width: 100%; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 150px;">Имя:</td>
            <td style="padding: 8px;">${userFormData.name}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${userFormData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Телефон:</td>
            <td style="padding: 8px;">${userFormData.phone}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Способ доставки:</td>
            <td style="padding: 8px;">${userFormData.deliveryMethod}</td>
          </tr>
          ${
            userFormData.comment
              ? `<tr>
            <td style="padding: 8px; font-weight: bold;">Комментарий:</td>
            <td style="padding: 8px;">${userFormData.comment}</td>
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
            ${itemsHtml}
          </tbody>
        </table>
        
        <div style="text-align: right; font-size: 18px; font-weight: bold; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          Итого: ${totalPrice}
        </div>
      </div>
    `;

    // HTML письма для покупателя
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #333; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Not So Bike Parts</h1>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #333;">Спасибо за ваш заказ!</h2>
          <p style="font-size: 16px; line-height: 1.6;">Здравствуйте, ${userFormData.name}!</p>
          <p style="font-size: 16px; line-height: 1.6;">Мы получили ваш заказ и скоро свяжемся с вами для подтверждения деталей.</p>
          
          ${orderDetailsHtml}
          
          <p style="color: #666; margin-top: 30px; font-size: 14px; line-height: 1.6;">
            С уважением,<br/>
            <strong>Команда Not So Bike Parts</strong>
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
          <h2 style="color: #333;">Заказ от ${userFormData.name}</h2>
          
          ${orderDetailsHtml}
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #2196F3; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold;">💡 Совет:</p>
            <p style="margin: 5px 0 0 0;">Свяжитесь с клиентом в течение 24 часов для подтверждения заказа.</p>
          </div>
        </div>
      </div>
    `;

    // Отправка письма покупателю
    const customerEmail = await resend.emails.send({
      from: 'Not So Bike Parts <onboarding@resend.dev>', // Для тестов
      to: userFormData.email,
      subject: 'Подтверждение заказа - Not So Bike Parts',
      html: customerEmailHtml,
    });

    // Отправка письма администратору
    const adminEmail = await resend.emails.send({
      from: 'Not So Bike Parts Orders <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `🛒 Новый заказ от ${userFormData.name}`,
      html: adminEmailHtml,
      replyTo: userFormData.email, // Можно сразу ответить клиенту
    });

    console.log('Emails sent:', { customerEmail, adminEmail });

    return NextResponse.json({ 
      success: true,
      customerEmailId: customerEmail.data?.id,
      adminEmailId: adminEmail.data?.id,
    });

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