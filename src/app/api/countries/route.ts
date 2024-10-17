import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { countryList } from "@/lib/schema";

export async function GET() {
  try {
    const allCountries = await db.select().from(countryList).execute();
    console.log("Fetched countries from database:", allCountries);
    return NextResponse.json(allCountries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 },
    );
  }
}
