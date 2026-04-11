import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: '이메일을 입력해주세요.' }, { status: 400 });
    }

    // Check if user exists
    const users: any[] = await prisma.$queryRaw`
      SELECT id, name, email FROM users WHERE email = ${email} LIMIT 1
    `;
    const user = users[0];

    if (!user) {
      // 보안을 위해 해당 이메일이 없더라도 성공 메시지를 반환합니다. (User Enumeration 방지)
      return NextResponse.json({ success: true, message: '이메일이 발송되었습니다.' });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1시간 후 만료

    // Save token
    await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token,
        expiresAt,
      }
    });

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.clsedu.co.kr';
    const resetUrl = `${appUrl}/login/reset-password?token=${token}`;

    const mailOptions = {
      from: {
        name: 'CLS에듀케이션',
        address: process.env.SMTP_FROM || 'no-reply@clsedu.co.kr'
      },
      to: user.email,
      subject: '[CLS에듀케이션] 비밀번호 재설정 링크 안내',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #f97316; text-align: center; margin-bottom: 24px;">비밀번호 재설정 안내</h2>
          <p style="font-size: 16px; color: #374151; line-height: 1.5;">
            안녕하세요, <strong>${user.name}</strong>님.<br/>
            비밀번호 재설정 요청을 받았습니다. 아래 버튼을 클릭하여 비밀번호를 새로 설정하실 수 있습니다.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">비밀번호 재설정하기</a>
          </div>
          <p style="font-size: 14px; color: #6b7280; text-align: center; line-height: 1.5;">
            만약 버튼이 클릭되지 않는다면 아래 링크를 주소창에 복사하여 붙여넣으세요.<br/>
            <a href="${resetUrl}" style="color: #4f46e5; word-break: break-all;">${resetUrl}</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;"/>
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            본 메일은 발신 전용이며, 이 메일을 요청하지 않으셨다면 이 메일을 무시하셔도 됩니다.<br/>
            해당 링크는 1시간 동안만 유효합니다.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: '이메일이 발송되었습니다.' });

  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ 
      error: '이메일 발송 중 오류가 발생했습니다.', 
      debugDetail: process.env.NODE_ENV === 'development' ? (error?.message || String(error)) : undefined
    }, { status: 500 });
  }
}
