import { RegisterRequestBody } from "@/interfaces/User";
import prisma from "@/lib/prisma";
import { isValidUrl } from "@/utils/common.utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name, provider, providerUUID, photoURL } =
    (await req.json()) as RegisterRequestBody;

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

  // Check image URL is valid
  if (photoURL && typeof photoURL === "string" && !isValidUrl(photoURL)) {
    return NextResponse.json(
      { status: false, message: "Invalid image URL" },
      { status: 400 },
    );
  }

  // Create a new user in the database
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      provider,
      providerUUID,
      photoURL,
    },
  });

  return NextResponse.json({
    status: true,
    data: newUser,
  });
}
