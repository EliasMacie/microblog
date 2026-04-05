import { NextResponse } from "next/server";
import { enviarCodigoEmail } from "./functions/enviarCodigoEmail"
import { validarCodigoEmail } from "./functions/validarCodigoEmail";
import { criarUsuario } from "./functions/criarUsuario";

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
        case "criarUsuario":
            return NextResponse.json(await criarUsuario(req))
            break;
        default:
            return NextResponse.json({ error: "Operação inválida" }, { status: 400 });
    }
}