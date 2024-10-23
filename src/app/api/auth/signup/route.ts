import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received signup request with body:", body);

    // Destructure the body to get the required fields
    const { email, password, firstName, lastName } = body;

    // Attempt to sign up the user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data) {
      console.log("Signup successful, user data:", data);
      return NextResponse.json(data, { status: 200 });
    }

  } catch (error) {
    console.error("Detailed error in signup API:", error);
    return NextResponse.json({ error: "An unexpected error occurred", details: error }, { status: 500 });
  }
}
