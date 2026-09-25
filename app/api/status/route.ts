import { getServerStatus } from "@/lib/get-server-status";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getServerStatus();
  return Response.json(status);
}
