import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const type: "page" | "layout" = body.type ?? "page";

  // paths 배열 또는 단건 path 모두 지원
  const paths: string[] = body.paths ?? (body.path ? [body.path] : []);
  if (paths.length === 0) {
    return NextResponse.json({ error: "path or paths is required" }, { status: 400 });
  }

  paths.forEach((p) => revalidatePath(p, type));
  return NextResponse.json({ revalidated: true, paths });
}
