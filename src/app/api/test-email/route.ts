// src/app/api/test-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
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

    console.log('🧪 Testing Resend configuration...');
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('Admin email:', process.env.ADMIN_EMAIL);

    const from =
      process.env.RESEND_FROM ??
      'Notsobikeparts <noreply@notsobikeparts.com>';

    const result = await resend.emails.send({
      from,
      to: process.env.ADMIN_EMAIL,
      replyTo: process.env.ADMIN_EMAIL,
      subject: '🧪 Test Email from notsobikeparts',
      html: '<h1>Test Email</h1><p>If you received this, Resend is working!</p>',
    });

    if (result.error) {
      return NextResponse.json(
        { error: 'Resend rejected the request', details: result.error },
        { status: 502 }
      );
    }

    console.log('✅ Test email sent:', result);

    return NextResponse.json({ 
      success: true, 
      result,
      config: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        adminEmail: process.env.ADMIN_EMAIL,
      }
    });
  } catch (error) {
    console.error('❌ Test email failed:', error);
    return NextResponse.json(
      { 
        error: 'Failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}