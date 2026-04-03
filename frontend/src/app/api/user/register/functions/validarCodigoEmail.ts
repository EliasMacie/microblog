export async function validarCodigoEmail(req: Request){
    const body = await req.json();
    const {email} = body;
    const {codigoEntrada} = body;
    const codigo = codigoEntrada;

    const response = await fetch('http://localhost:4000/user/register/validarCodigo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, codigo})
    })

    const data = await response.json()
    return data;
}