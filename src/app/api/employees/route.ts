// src/app/api/employees/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { InferModel } from 'drizzle-orm';

type NewEmployee = InferModel<typeof employees, 'insert'>;

export async function POST(req: Request) {
  try {
    const {
      employerId,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      jobTitle,
      department,
      startDate,
    } = await req.json();

    const newEmployeeData: NewEmployee = {
      employer_id: employerId,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      gender,
      date_of_birth: dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : null,
      job_title: jobTitle,
      department,
      start_date: startDate ? new Date(startDate).toISOString().split('T')[0] : null,
    };

    const [newEmployee] = await db.insert(employees).values(newEmployeeData).returning();

    return NextResponse.json({ message: 'Employee added successfully', employee: newEmployee }, { status: 201 });
  } catch (error) {
    console.error('Error adding employee:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
