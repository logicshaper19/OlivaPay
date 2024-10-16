import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employers } from '@/lib/schema';

export async function POST(req: Request) {
  try {
    const body: { email: string; password: string } = await req.json();
    console.log('Received signup data:', body);

    const newEmployer = await db.insert(employers).values({
      id: undefined as any, // This tells Drizzle to use the database's auto-increment
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      phoneNumber: '', // Add a default empty string for phoneNumber
    }).returning({ id: employers.id });

    console.log('New employer created:', newEmployer[0]);

    return NextResponse.json({ employerId: newEmployer[0].id, message: "Signup successful" }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
