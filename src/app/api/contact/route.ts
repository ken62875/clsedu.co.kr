import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { studentName, schoolGrade, parentPhone, interest, message } = await request.json();

    if (!studentName || !schoolGrade || !parentPhone) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해주세요.' }, { status: 400 });
    }

    // `auth/forgot-password/route.ts`에서 사용한 SMTP 설정 참조
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.naver.com',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    });

    const interestMap: Record<string, string> = {
      'math': '수학',
      'english': '영어',
      'korean': '국어',
      'science': '과학',
      'consulting': '입시 컨설팅',
      '': '선택 안함'
    };

    const interestLabel = interestMap[interest] || '선택 안함';

    const htmlContent = `
      <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-bottom: 20px; text-align: center;">홈페이지 상담 문의</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr>
              <th style="padding: 12px; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc; text-align: left; width: 120px; color: #475569;">학생 이름</th>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${studentName}</td>
            </tr>
            <tr>
              <th style="padding: 12px; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc; text-align: left; color: #475569;">학교 및 학년</th>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${schoolGrade}</td>
            </tr>
            <tr>
              <th style="padding: 12px; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc; text-align: left; color: #475569;">연락처</th>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${parentPhone}</td>
            </tr>
            <tr>
              <th style="padding: 12px; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc; text-align: left; color: #475569;">관심 과목</th>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${interestLabel}</td>
            </tr>
            <tr>
              <th style="padding: 12px; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc; text-align: left; vertical-align: top; color: #475569;">문의 내용</th>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; white-space: pre-wrap;">${message || '내용 없음'}</td>
            </tr>
          </tbody>
        </table>
        
        <p style="margin-top: 24px; font-size: 13px; color: #64748b; text-align: center;">
          본 메일은 홈페이지 문의를 통해 자동으로 발송되었습니다.
        </p>
      </div>
    `;

    const mailOptions = {
      from: {
        name: 'CLS에듀케이션',
        address: 'info@clsedu.co.kr'
      },
      to: 'info@clsedu.co.kr',
      bcc: 'ivy@ivynet.co.kr',
      subject: `[CLS에듀케이션] ${studentName} 학생 상담 문의`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: '문의가 성공적으로 접수되었습니다.' });

  } catch (error: any) {
    console.error('Contact email sending error:', error);
    return NextResponse.json({ 
      error: '이메일 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 
      debugDetail: process.env.NODE_ENV === 'development' ? (error?.message || String(error)) : undefined
    }, { status: 500 });
  }
}
