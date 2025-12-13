// src/app/api/test-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing Resend configuration...');
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('Admin email:', process.env.ADMIN_EMAIL);

    const result = await resend.emails.send({
      from: 'Test <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: '🧪 Test Email from Not So Bike Parts',
      html: '<h1>Test Email</h1><p>If you received this, Resend is working!</p>',
    });

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