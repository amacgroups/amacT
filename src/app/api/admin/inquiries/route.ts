import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getDbInquiries, updateDbInquiryStatus, deleteDbInquiry } from '@/lib/db';

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = getDbInquiries();
  return NextResponse.json({ success: true, inquiries });
}

export async function PATCH(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID and status required' }, { status: 400 });
    }

    const ok = updateDbInquiryStatus(id, status);
    if (!ok) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update inquiry' }, { status: 500 });
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
      return NextResponse.json({ success: false, message: 'Inquiry ID is required' }, { status: 400 });
    }

    const deleted = deleteDbInquiry(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete inquiry' }, { status: 500 });
  }
}
