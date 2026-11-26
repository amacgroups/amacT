import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAdminUser } from '@/lib/db';

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const admin = getAdminUser();
  return NextResponse.json({
    authenticated: true,
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });
}
