// src/app/api/employees/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { employees } from "@/lib/schema";

function parseDate(dateString: string | null): Date | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBirth,
    jobTitle,
    department,
    startDate,
    employerId,
  } = body;

  const parsedDateOfBirth = parseDate(dateOfBirth);
  const parsedStartDate = parseDate(startDate);

  if (!parsedDateOfBirth || !parsedStartDate) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  try {
    const newEmployee = await db
      .insert(employees)
      .values({
        firstName,
        lastName,
        phoneNumber,
        gender,
        dateOfBirth: parsedDateOfBirth,
        jobTitle,
        department,
        startDate: parsedStartDate,
        employerId: Number(employerId),
      })
      .returning();

    return NextResponse.json(newEmployee[0]);
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 },
    );
  }
}
