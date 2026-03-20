import { NextResponse } from "next/server";
import { enviarCodigoEmail } from "./functions/enviarCodigoEmail"

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const op = searchParams.get("op");

    switch (op) {
        case "enviarCodigoEmail":
            const data = await enviarCodigoEmail(req);
            return NextResponse.json(data)
            break;
        default:
            return NextResponse.json({ error: "Operação inválida" }, { status: 400 });
    }
}