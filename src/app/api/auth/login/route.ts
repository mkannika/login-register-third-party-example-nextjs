import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Check if the user exists in the database and if the password is correct
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user?.password) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "User not found or password not set",
      }),
      { status: 404 },
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordCorrect) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "Invalid email or password",
      }),
      { status: 401 },
    );
  }

  // Return user data excluding password
  const { password: _, ...userData } = user;
  return new Response(JSON.stringify({ status: true, data: userData }), {
    status: 200,
  });
}
