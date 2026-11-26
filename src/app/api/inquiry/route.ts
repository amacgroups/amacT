import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reference = 'AMAC-' + Math.floor(100000 + Math.random() * 900000);

    return NextResponse.json({
      success: true,
      reference,
      message: 'Inquiry received successfully by AMAC Group export desk.',
      receivedData: {
        company: body.company,
        produce: body.produce,
        volume: body.volume,
      },
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
