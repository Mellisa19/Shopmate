import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Verify token and get user
    const { data: session, error: sessionError } = await supabase
      .from('user_sessions')
      .select('user_id')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get user orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', session.user_id)
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Orders fetch error:', ordersError);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('User orders error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
