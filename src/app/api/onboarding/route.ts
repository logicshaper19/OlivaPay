import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { companyDetails, onboardingPreferences } from '@/lib/schema';
import { InferModel } from 'drizzle-orm';

type NewCompanyDetails = InferModel<typeof companyDetails, 'insert'>;
type NewOnboardingPreferences = InferModel<typeof onboardingPreferences, 'insert'>;

export async function POST(req: Request) {
  try {
    const { 
      employerId, 
      companyName, 
      companyType, 
      website, 
      countryId, 
      countyId, 
      companySize, 
      employeeCount, 
      needAssistance 
    } = await req.json();

    // Insert company details
    const newCompanyDetails: NewCompanyDetails = {
      id: 0, // This will be ignored by the database and auto-generated
      employerId: Number(employerId),
      companyName,
      companyType,
      website,
      countryId: Number(countryId),
      countyId: countyId ? Number(countyId) : null,
      companySize
    };

    await db.insert(companyDetails).values(newCompanyDetails).execute();

    // Insert onboarding preferences
    const newOnboardingPreferences: NewOnboardingPreferences = {
      id: 0, // This will be ignored by the database and auto-generated
      employerId: Number(employerId),
      employeeCount: Number(employeeCount),
      needAssistance: Boolean(needAssistance)
    };

    await db.insert(onboardingPreferences).values(newOnboardingPreferences).execute();

    return NextResponse.json({ message: 'Onboarding data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in onboarding:', error);
    return NextResponse.json({ error: 'An error occurred during onboarding' }, { status: 500 });
  }
}
