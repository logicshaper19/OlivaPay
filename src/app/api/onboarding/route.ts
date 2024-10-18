import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Received onboarding data:", body);

    // Validate required fields
    if (!body.employerId || !body.companyName || !body.companyType || !body.countryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insert data into companydetails table
    const { data, error } = await supabase
      .from('companydetails')
      .insert({
        employer_id: body.employerId,
        company_name: body.companyName,
        company_type: body.companyType,
        website: body.website,
        country_id: body.countryId,
        county_id: body.countyId,
        company_size: body.companySize,
      })
      .select()

    if (error) throw error

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('Error in onboarding:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
