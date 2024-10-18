import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    // Validate the input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Sign up the user using Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      const userData = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.user_metadata.first_name,
        lastName: data.user.user_metadata.last_name,
      };

      console.log("Sending response:", userData);
      return NextResponse.json(userData);
    } else {
      throw new Error("User creation failed");
    }
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
