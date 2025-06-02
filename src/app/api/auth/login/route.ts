// Create POST /api/auth/login endpoint for backend and find user on Prisma DB response UserResponse

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Check if the user exists in the database and if the password is correct
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user || user.password !== password) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401 }
    );
  }
}
