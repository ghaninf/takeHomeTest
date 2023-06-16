import { NextResponse } from 'next/server';
import { db } from '@/libs/db';

export async function GET(request) {
  try {
    console.log('get')
    let body = await request.json();
    const query = { deletedAt: 0 };
    if (body.title) {
      query['title'] = body.title
    }

    const mongoDB = await mongoClient();
    // const db = mongoDB.db('test')
    const products = await db.Product
      .find(query)
      .lean()
      .exec();

    console.log(products)
  } catch (error) {
    
  }
  


  

  return NextResponse.json(data)
}