// Create POST /api/auth/register endpoint for backend and create user on Prisma DB when register by Google Firebase
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name, provider, providerUUID } = await req.json();

  // Check if the user already exists in the database
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "User already exists",
      }),
      {
        status: 409,
      },
    );
  }

  // Create a new user in the database
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      provider,
      providerUUID,
    },
  });

  return NextResponse.json({
    status: true,
    data: newUser,
  });
}
