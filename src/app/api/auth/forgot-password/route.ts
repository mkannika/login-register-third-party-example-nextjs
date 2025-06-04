import { MESSAGES } from "@/constants/messages";
import { sendPasswordResetEmail } from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { email } = await req.json();

  // Find user from the database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "User not found",
      }),
      { status: 404 },
    );
  }

  // Generate unique reset token
  const resetToken = uuidv4();
  const resetTokenExpires = new Date();
  // Token valid for 1 hour
  resetTokenExpires.setHours(resetTokenExpires.getHours() + 1);

  // Check if the user already has a reset token that is still valid
  if (
    user.resetToken &&
    user.resetTokenExpires &&
    user.resetTokenExpires > new Date()
  ) {
    return new Response(
      JSON.stringify({
        status: false,
        message: MESSAGES.AUTH.RESET_PASSWORD_IS_PENDING,
      }),
      { status: 400 },
    );
  }

  // Update the user's reset token and reset token expires
  await prisma.user.update({
    where: { email },
    data: {
      resetToken: resetToken,
      resetTokenExpires,
    },
  });

  // Send the reset password email (you need to implement this function)
  try {
    await sendPasswordResetEmail(email, resetToken);
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: false,
        message: MESSAGES.AUTH.RESET_PASSWORD_FAILURE,
      }),
      { status: 500 },
    );
  }

  return new Response(
    JSON.stringify({
      status: true,
      message: MESSAGES.AUTH.RESET_PASSWORD_SUCCESS,
    }),
    { status: 200 },
  );
}
