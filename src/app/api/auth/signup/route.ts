import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
      },
    });

    if (error) {
      if (error.message.includes('Password should be at least 6 characters')) {
        return NextResponse.json({ error: 'Password should be at least 6 characters long.' }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({
      id: data.user?.id,
      email: data.user?.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
