/* eslint-disable import/no-anonymous-default-export */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json(
      { error: "A valid URL is required" },
      { status: 400 }
    );
  }

  const shortUrl = Math.random().toString(36).substr(2, 5);

  try {
    const data = await prisma.link.create({
      data: { url, shortUrl },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
