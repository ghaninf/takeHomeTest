import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function GET(request) {
  try {
    let body = await request.json();
    const query = { deletedAt: 0 };
    if (body.title) {
      query['title'] = body.title
    }

    const products = await db.Product
      .find(query)
      .lean()
      .exec();

    return NextResponse.json(products)
  } catch (error) {
    throw NextResponse.json({ status: 500 })
  }
}