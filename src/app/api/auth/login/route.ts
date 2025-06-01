// Create POST /api/auth/login endpoint for backend and find user on Prisma DB response UserResponse

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  // Check if the user exists in the database
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "User not found",
      }),
      {
        status: 404,
      },
    );
  }

  // If user exists, return the user data
  return new Response(
    JSON.stringify({
      status: true,
      data: {
        email,
        id: user.id,
        name: user.name || null,
      },
    }),
    {
      status: 200,
    },
  );
}
