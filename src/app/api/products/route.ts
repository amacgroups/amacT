import { NextResponse } from 'next/server';
import { getDbProducts } from '@/lib/db';

export async function GET() {
  try {
    const products = getDbProducts();
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve products' },
      { status: 500 }
    );
  }
}
