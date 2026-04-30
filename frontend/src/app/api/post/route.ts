import { NextResponse } from 'next/server';
import { post } from './functions/post';
import { findAll } from './functions/findAll';

export async function POST(req: Request) {
  try {
    const result = await post(req);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const result = await findAll(req);
    return NextResponse.json(result)
  }catch (error) {
    return NextResponse.json(
      {sucesso: 'erro ao listar post router frontend'},
      {status: 500}
    );
  }
}