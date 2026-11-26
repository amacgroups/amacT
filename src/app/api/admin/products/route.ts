import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getDbProducts, createDbProduct, updateDbProduct, deleteDbProduct } from '@/lib/db';

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const products = getDbProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.name || !data.category) {
      return NextResponse.json({ success: false, message: 'Name and Category are required' }, { status: 400 });
    }

    const created = createDbProduct({
      name: data.name,
      category: data.category === 'fruits' ? 'fruits' : 'vegetables',
      tagline: data.tagline || '',
      season: data.season || 'Year-round',
      packaging: data.packaging || 'Standard Export Carton',
      image: data.image || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
      description: data.description || '',
      specs: {
        origin: data.specs?.origin || 'AMAC Groves & Farms',
        shelfLife: data.specs?.shelfLife || '30 - 60 Days',
        temperature: data.specs?.temperature || '+4°C',
        certifications: Array.isArray(data.specs?.certifications) ? data.specs.certifications : ['GlobalG.A.P.', 'ISO 22000'],
      },
    });

    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.id) {
      return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
    }

    const updated = updateDbProduct(data.id, data);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
    }

    const deleted = deleteDbProduct(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete product' }, { status: 500 });
  }
}
