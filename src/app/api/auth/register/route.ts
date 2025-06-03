import { RegisterRequestBody } from "@/interfaces/User";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name, password } = (await req.json()) as RegisterRequestBody;

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

  if (!email || !name || !password) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "Email, name, and password are required",
      }),
      {
        status: 400,
      },
    );
  }

  // Encrypt the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    status: true,
    data: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  });
}
