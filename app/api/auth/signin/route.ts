import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, password_hash, created_at')
      .eq('email', email.toLowerCase())
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Clean up old sessions
    await supabase
      .from('user_sessions')
      .delete()
      .lt('expires_at', new Date().toISOString());

    // Create new session token
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await supabase.from('user_sessions').insert({
      user_id: user.id,
      token,
      expires_at: expiresAt.toISOString(),
    });

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Sign in successful',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
