import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Initialize Prisma once globally (recommended in most apps)
const prisma = new PrismaClient();

export async function POST(req: Request): Promise<Response> {
  try {
    const { token, password } = await req.json();

    if (!token || !password || password.length < 6) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Token and a valid password are required",
        }),
        { status: 400 },
      );
    }

    // Find the user by reset token and check expiration
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Invalid or expired reset token",
        }),
        { status: 400 },
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return new Response(
      JSON.stringify({
        status: true,
        message: "Password has been reset successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return new Response(
      JSON.stringify({
        status: false,
        message: "Internal server error",
      }),
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
