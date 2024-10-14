// src/app/signup/route.ts
import { db } from '@/lib/db';
import { employers } from '@/lib/schema';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new employer
    const [newEmployer] = await db.insert(employers).values({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    }).returning();

    return NextResponse.json({ message: 'Signup successful', employer: newEmployer }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
