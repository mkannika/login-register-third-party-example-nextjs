// lib/mailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // ควรจะเป็น smtp.gmail.com
  port: parseInt(process.env.EMAIL_PORT || "587"), // พอร์ต 587 (STARTTLS) หรือ 465 (SSL/TLS)
  secure: false, // สำหรับพอร์ต 587 ให้ตั้งค่าเป็น false เพื่อใช้ STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // นี่อาจไม่จำเป็นสำหรับ Gmail เสมอไป แต่บางครั้งช่วยแก้ปัญหา cert ได้
    // ใน Production จริงๆ ควรแน่ใจว่าไม่มี rejectUnauthorized: false
    rejectUnauthorized: false,
  },
});

// --- ฟังก์ชันสำหรับโครงสร้างพื้นฐานของอีเมล HTML ---
const getEmailHtml = (subject: string, contentHtml: string) => {
  const primaryColor = "#6A5ACD"; // สีม่วง
  const textColor = "#333333";
  const lightTextColor = "#666666";
  const buttonBgColor = primaryColor;
  const buttonTextColor = "#FFFFFF";
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/icon.png`; // สมมติว่ามีโลโก้อยู่ใน public folder
  const logoAlt = "Your Logo"; // ข้อความ alt สำหรับโลโก้

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
                background-color: #f4f7fa;
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: none;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                border: 1px solid #e0e0e0;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .header img {
                max-width: 150px;
                height: auto;
            }
            .content {
                color: ${textColor};
                line-height: 1.6;
                font-size: 16px;
            }
            .content p {
                margin-bottom: 6px;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                background-color: ${buttonBgColor};
                color: ${buttonTextColor} !important;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                font-size: 16px;
                white-space: nowrap;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 13px;
                color: ${lightTextColor};
            }
            .footer p {
                margin: 5px 0;
            }
            a {
                color: ${primaryColor};
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${
                  process.env.NEXT_PUBLIC_BASE_URL &&
                  `<img src="${logoUrl}" alt="${logoAlt}">`
                }
            </div>
            <div class="content">
                ${contentHtml}
            </div>
            <div class="footer">
                <p>If you have any questions, please contact us.</p>
                <p>&copy; ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// --- ฟังก์ชันส่งอีเมลยืนยัน (ปรับดีไซน์) ---
export const sendVerificationEmail = async (toEmail: string, token: string) => {
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

  const contentHtml = `
    <p>Thank you for registering!</p>
    <p>Please verify your email by clicking on the button below:</p>
    <div class="button-container">
        <a href="${verificationLink}" class="button">Verify Email Address</a>
    </div>
    <p>This link will expire in 1 hour.</p>
    <p style="font-size: 14px; color: #888;">If the button above does not work, please copy and paste the following link into your web browser:</p>
    <p style="font-size: 14px; word-break: break-all;"><a href="${verificationLink}">${verificationLink}</a></p>
    <p>If you did not register, please ignore this email.</p>
  `;

  await transporter.sendMail({
    from: '"Your App Name" <no-reply@yourapp.com>',
    to: toEmail,
    subject: "Verify Your Email Address",
    html: getEmailHtml("Verify Your Email Address", contentHtml),
  });
};

// --- ฟังก์ชันส่งอีเมลรีเซ็ตรหัสผ่าน (ปรับดีไซน์) ---
export const sendPasswordResetEmail = async (
  toEmail: string,
  token: string,
) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  const contentHtml = `
    <p>You have requested a password reset for your account.</p>
    <p>Please click on the button below to reset your password:</p>
    <div class="button-container">
        <a href="${resetLink}" class="button">Reset Your Password</a>
    </div>
    <p>This link will expire in 1 hour.</p>
    <p style="font-size: 14px; color: #888;">If the button above does not work, please copy and paste the following link into your web browser:</p>
    <p style="font-size: 14px; word-break: break-all;"><a href="${resetLink}">${resetLink}</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
  `;

  await transporter.sendMail({
    from: '"Your App Name" <no-reply@yourapp.com>',
    to: toEmail,
    subject: "Password Reset Request",
    html: getEmailHtml("Password Reset Request", contentHtml),
  });
};
