import { NextResponse } from "next/server";
import { enviarCodigoEmail } from "./functions/enviarCodigoEmail"

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const op = searchParams.get("op");

    switch (op) {
        case "enviarCodigoEmail":
            await enviarCodigoEmail(req);
        default:
            return NextResponse.json({ error: "Operação inválida" }, { status: 400 });
    }
}