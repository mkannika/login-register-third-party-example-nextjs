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

  // If status is true, it means the user exists and set cookie
  // Set a cookie to indicate the user is logged in
  const cookie = `auth_token=${user.id}; Path=/; HttpOnly; SameSite=Lax; Secure`;
  const headers = new Headers();
  headers.append("Set-Cookie", cookie);

  // If user exists, return the user data
  return new Response(
    JSON.stringify({
      status: true,
      data: {
        email,
        id: user.id,
        name: user.name || null,
        photoURL: user.photoURL || null,
      },
    }),
    {
      status: 200,
    },
  );
}
