import React from "react";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

interface Params {
  shortId: string;
}

export default async function Page({ params }: { params: Params }) {
  const prisma = new PrismaClient();
  const { shortId } = params;

  const data = await prisma.link.findUnique({ where: { shortUrl: shortId } });

  if (!data) {
    redirect("/");
  } else {
    redirect(data.url);
  }

  return <div>Redirecting...</div>;
}
