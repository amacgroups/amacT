import { NextResponse } from 'next/server';
import { createDbInquiry } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.company || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Name, Company, and Email are required.' },
        { status: 400 }
      );
    }

    const inquiry = createDbInquiry({
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone || '',
      destinationCountry: body.destinationCountry || '',
      produce: body.produce || 'General Produce',
      volume: body.volume || '1-2 Containers',
      message: body.message || '',
    });

    return NextResponse.json({
      success: true,
      reference: inquiry.reference,
      inquiryId: inquiry.id,
      message: 'Inquiry received successfully by AMAC Group export desk.',
      receivedAt: inquiry.createdAt,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}
