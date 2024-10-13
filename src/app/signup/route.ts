import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email } = await request.json()
    
    console.log('Received signup data:', { firstName, lastName, email })

    // Your signup logic here
    // For now, let's just return a success response
    return NextResponse.json({ message: 'Signup successful', user: { firstName, lastName, email } })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed' }, { status: 400 })
  }
}
