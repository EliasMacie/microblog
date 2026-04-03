import { NextResponse } from "next/server";
import { enviarCodigoEmail } from "./functions/enviarCodigoEmail"
import { validarCodigoEmail } from "./functions/validarCodigoEmail";

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const op = searchParams.get("op");

    switch (op) {
        case "enviarCodigoEmail":
            return NextResponse.json(await enviarCodigoEmail(req))
            break;
        case "validarCodigoEmail":
            return NextResponse.json(await validarCodigoEmail(req))
            break;
        default:
            return NextResponse.json({ error: "Operação inválida" }, { status: 400 });
    }
}