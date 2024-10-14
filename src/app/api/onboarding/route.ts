import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { companydetails, onboardingpreferences } from '@/lib/schema';

export async function POST(req: Request) {
  try {
    const { 
      userId,
      companyName,
      companyType,
      website,
      country,
      county,
      companySize,
      employeeCount,
      needAssistance
    } = await req.json();

    // Create company details
    const [newCompanyDetails] = await db.insert(companydetails).values({
      employer_id: userId,
      company_name: companyName,
      company_type: companyType,
      website,
      country_id: country,
      county_id: county,
      company_size: companySize
    }).returning();

    // Create onboarding preferences
    await db.insert(onboardingpreferences).values({
      employer_id: userId,
      employee_count: parseInt(employeeCount),
      need_assistance: needAssistance
    });

    return NextResponse.json({ message: 'Onboarding completed successfully', companyId: newCompanyDetails.id }, { status: 201 });
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
