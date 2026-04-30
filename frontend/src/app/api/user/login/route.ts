import { NextResponse } from "next/server";
import { login } from "./function/login";

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const op = searchParams.get("op");

    switch (op) {
        case "login":
            return await login(req); 
        default:
            return NextResponse.json({ error: "Operação inválida" }, { status: 400 });
    }
}