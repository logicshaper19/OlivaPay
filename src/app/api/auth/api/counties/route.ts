import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { county } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  console.log('Counties API route hit');
  const { searchParams } = new URL(request.url);
  const countryId = searchParams.get('countryId');
  console.log('Received countryId:', countryId);

  if (!countryId) {
    console.log('Country ID is missing');
    return NextResponse.json({ error: 'Country ID is required' }, { status: 400 });
  }

  try {
    console.log('Attempting to fetch counties from database');
    const counties = await db.select().from(county).where(eq(county.countryId, parseInt(countryId))).execute();
    console.log('Fetched counties:', counties);
    return NextResponse.json(counties);
  } catch (error: unknown) {
    console.error('Error fetching counties:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch counties', details: errorMessage }, { status: 500 });
  }
}
