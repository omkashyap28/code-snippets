import { NextRequest } from "next/server";

const ONE_COMPILER_API_PRIVATE_KEY = process.env.ONE_COMPILER_API_PRIVATE_KEY;

if (!ONE_COMPILER_API_PRIVATE_KEY) {
  throw new Error("Please add one_compiler api key to environment variable");
}

export async function POST(req: NextRequest) {
  const { language, version, files } = await req.json();

  console.log(language, version, files);

  return (await fetch("https://api.onlinecompiler.io/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ONE_COMPILER_API_PRIVATE_KEY!,
    },
    body: JSON.stringify({
      language,
      version,
      files,
    }),
  })) as Response;
}
