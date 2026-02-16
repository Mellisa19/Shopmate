import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(request: NextRequest) {
    try {
        const { email, gdprConsent } = await request.json();

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Check GDPR consent
        if (!gdprConsent) {
            return NextResponse.json(
                { error: 'Please accept the privacy policy to subscribe' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const { data: existing } = await supabase
            .from('newsletter_subscribers')
            .select('email')
            .eq('email', email.toLowerCase())
            .single();

        if (existing) {
            return NextResponse.json(
                { error: 'This email is already subscribed' },
                { status: 409 }
            );
        }

        // Store email in Supabase
        const { error: dbError } = await supabase
            .from('newsletter_subscribers')
            .insert({
                email: email.toLowerCase(),
                subscribed_at: new Date().toISOString(),
                gdpr_consent: gdprConsent,
                source: 'website_footer',
            });

        if (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json(
                { error: 'Failed to subscribe. Please try again.' },
                { status: 500 }
            );
        }

        // Send welcome email via Resend
        try {
            const emailResult = await resend.emails.send({
                from: 'ShopMate <noreply@shopmate.local>', // Use a local domain for testing
                to: email,
                subject: 'Welcome to ShopMate! 🎉',
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: #18181b; margin: 0; font-size: 32px;">Welcome to ShopMate!</h1>
              <p style="color: #18181b; margin: 10px 0 0 0; font-size: 18px;">Your journey to amazing products starts here 🚀</p>
            </div>
            
            <div style="background: #f9fafb; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
              <h2 style="color: #18181b; margin-top: 0;">Thank you for subscribing!</h2>
              <p style="color: #52525b; font-size: 16px; line-height: 1.6;">
                You're now part of the ShopMate family. Get ready for:
              </p>
              <ul style="color: #52525b; font-size: 16px; line-height: 1.8;">
                <li>🎉 Exclusive deals and member-only discounts</li>
                <li>📦 New product arrivals and early access</li>
                <li>🔥 Special promotions and flash sales</li>
                <li>💡 Personalized recommendations</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3000" style="background: #fbbf24; color: #18181b; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Start Shopping Now
              </a>
            </div>
            
            <div style="border-top: 1px solid #e4e4e7; margin-top: 30px; padding-top: 20px;">
              <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                You're receiving this email because you subscribed to ShopMate's newsletter.
              </p>
              <p style="color: #a1a1aa; font-size: 12px; margin: 5px 0 0 0;">
                Want to unsubscribe? You can opt out anytime by clicking the link in our future emails.
              </p>
              <p style="color: #a1a1aa; font-size: 12px; margin: 15px 0 0 0;">
                <strong>ShopMate Inc.</strong> | Your Trusted Shopping Partner
              </p>
            </div>
          </div>
        `,
            });
            
            console.log('Email sent successfully:', emailResult);
        } catch (emailError) {
            // Log but don't fail - subscription is already saved
            console.error('Email send error:', emailError);
        }

        return NextResponse.json(
            { message: 'Successfully subscribed! Check your email for confirmation.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
