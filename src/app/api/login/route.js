import { NextResponse } from 'next/server';
import Token from '@/libs/token';

export async function POST(request) {
  let body = await request.json();
  if (
    !body?.email || 
    !body?.password
  ) {
    return NextResponse.json(
      { error: 'Email and Password is required' },
      { status: 400 }
    );
  }

  body['token'] = "Bearer " + Token.generateJWTToken(body)

  delete body.password

  return NextResponse.json(body)
}