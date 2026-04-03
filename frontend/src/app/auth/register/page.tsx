'use client'
import { useState } from 'react';
import styles from './register.module.css';
import {useRouter} from 'next/navigation';

export default function Register(){
    const router = useRouter();
    const [pagina, setPagina] = useState(1);
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [nomePerfil, setNomePerfil] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [email, setEmail] = useState('');
    const [codigoEntrada, setCodigoEntrada] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [data, setData] = useState('');

    const [focus1, setFocus1] = useState(false)
    const [focus2, setFocus2] = useState(false)
    const [focus3, setFocus3] = useState(false)
    const [focus4, setFocus4] = useState(false)

    const [loading, setLoading] = useState(false)

    const pagina1Valida =
        nomeCompleto.trim() !== '' &&
        email.trim() !== '' &&
        dia !== '' &&
        mes !== '' &&
        ano !== '';
    
    const pagina2Valida = codigoEntrada.trim().length === 6;

    const pagina3Valida =
        password.length >= 8 &&
        password === confirmarPassword;
    
    const pagina4Valida = nomePerfil.trim() !== '';
    
    const pagina5Valida =
        userName.trim() !== '' &&
        !userName.includes(' ')

    const formularioValidado = 
        (pagina === 1 && pagina1Valida) ||
        (pagina === 2 && pagina2Valida) ||
        (pagina === 3 && pagina3Valida) ||
        (pagina === 4 && pagina4Valida) ||
        (pagina === 5 && pagina5Valida)
    

    const handlerNumber = (e) => {
        let valor = e.target.value;

        if(valor === ""){
            setData("")
            return;
        }

        valor = Number(valor);

        if(valor > 31) valor = 31;
        if(valor < 1) valor = 1;

        setDia(valor)
    }

    const handleCodigo = (e) => {
        let valor = e.target.value;

        valor = valor.replace(/\D/g, '');

        valor = valor.slice(0, 6);

        setCodigoEntrada(valor);
    };

    const enviarCodigoParaEmail = async () => {
        try {
            const response = await fetch('/api/user/register?op=enviarCodigoEmail',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            });
            const data = await response.json();

            if(data.sucesso){
                setPagina(pagina + 1);
            } else {
                alert("Erro ao enviar o código");
            }

        } catch(err) {
            console.error(err);
            alert("Erro na requisição");
        } finally {
            setLoading(false); // termina loading
        }
    }

    const verificarCodigo = async () => {
        if (!codigoEntrada) return;

        try{
            const response = await fetch('/api/user/register?op=validarCodigoEmail',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, codigoEntrada})
            });

            const data = await response.json();

            if(data.sucesso){
                setPagina(pagina + 1)
            }else{
                alert("erro ao enviar o codigo")
            }
        } catch(err){
            console.error(err);
            alert('error de validação')
        } finally{
            setLoading(false)
        }
        

    } 

    const handlerContinuar = () => {
        setLoading(true); // inicia loading
        if(pagina === 1){
            setLoading(false);
            setPagina(pagina + 1)
            // enviarCodigoParaEmail();
        }else if(pagina === 2){
            setLoading(false);
            setPagina(pagina + 1)
            // verificarCodigo();
        }else if(pagina === 3){
            setLoading(false);
            setPagina(pagina + 1)
        }else if(pagina === 4){
            setLoading(false);
            setPagina(pagina + 1)
        }else if(pagina === 5){
            setLoading(false);
            setPagina(pagina + 1)
        }
    }

    const voltar = () => {
        if(pagina < 2){
            router.push('login')
        }
        setPagina(pagina - 1);
    }

    return(
        <div className={styles.conteiner}>
            {loading?(<div>Carregando...</div>):(
                <>
                <div className={styles.areaVoltar}>
                    <button className={styles.butaoVoltar} onClick={voltar}>voltar</button>
                </div>

                <div className={styles.areaForm}>
                    {pagina === 1 && <h2 style={{fontSize:'2rem'}}>Sign Up</h2>}
                    <form className={styles.form}>
                        {pagina === 1 && (
                            <>
                                <div className={styles.inputArea}>
                                    <div className={focus1? styles.iconeFocusPerson : styles.iconePerson}>
                                        <i className="bi bi-person" style={{fontSize: '22px'}}></i>
                                    </div>
                                    <input 
                                        type="text"
                                        className={styles.input}
                                        value={nomeCompleto}
                                        placeholder='Nome Completo'
                                        onChange={(e) => setNomeCompleto(e.target.value)}
                                        onFocus={() => setFocus1(true)}
                                        onBlur={() => setFocus1(false)}
                                    />
                                </div>
                                <div className={styles.inputArea}>
                                    <div className={focus2? styles.iconeFocus : styles.icone}>
                                        <i className="bi bi-envelope" style={{fontSize: '22px', marginTop:"1px"}}></i>
                                    </div>
                                    <input 
                                        type="text"
                                        className={styles.input}
                                        value={email}
                                        placeholder='Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocus2(true)}
                                        onBlur={() => setFocus2(false)}
                                    />
                                </div>
                                <div>
                                    <p style={{ fontSize:'20px',marginBottom:"10px"}}>data nascimento</p>
                                    <div className={styles.areaDataNascimento}>
                                        <input 
                                            type="number" 
                                            name="" 
                                            id=""
                                            value={dia}
                                            onChange={handlerNumber}
                                            className={styles.inputDia}
                                            placeholder='Dia'
                                        />

                                        <select 
                                            name="" 
                                            id=""
                                            value={mes}
                                            onChange={(e) => setMes(e.target.value)}
                                            className={styles.selectMes}
                                        >
                                            <option value="" disabled hidden style={{color:'#737373'}}>Mes</option>
                                            <option value="1">janeiro</option>
                                            <option value="2">fevereiro</option>
                                            <option value="3">marco</option>
                                            <option value="4">abril</option>
                                            <option value="5">maio</option>
                                            <option value="6">junho</option>
                                            <option value="7">julho</option>
                                            <option value="8">agosto</option>
                                            <option value="9">setembro</option>
                                            <option value="10">outubro</option>
                                            <option value="11">novembro</option>
                                            <option value="12">dezembro</option>
                                        </select>
                                        <select 
                                            name="" 
                                            id=""
                                            value={ano}
                                            onChange = {(e) => setAno(e.target.value)}
                                            className={styles.selectAno}
                                        >   
                                            <option value="" disabled hidden style={{color:'#737373'}}>Ano</option>
                                            <option value="1980">1980</option>
                                            <option value="1981">1981</option>
                                            <option value="1982">1982</option>
                                            <option value="1983">1983</option>
                                            <option value="1984">1984</option>
                                            <option value="1985">1985</option>
                                            <option value="1986">1986</option>
                                            <option value="1987">1987</option>
                                            <option value="1988">1988</option>
                                            <option value="1989">1989</option>
                                            <option value="1990">1990</option>
                                            <option value="1991">1991</option>
                                            <option value="1992">1992</option>
                                            <option value="1993">1993</option>
                                            <option value="1994">1994</option>
                                            <option value="1995">1995</option>
                                            <option value="1996">1996</option>
                                            <option value="1997">1997</option>
                                            <option value="1998">1998</option>
                                            <option value="1999">1999</option>
                                            <option value="2000">2000</option>
                                            <option value="2001">2001</option>
                                            <option value="2002">2002</option>
                                            <option value="2003">2003</option>
                                            <option value="2004">2004</option>
                                            <option value="2005">2005</option>
                                            <option value="2006">2006</option>
                                            <option value="2007">2007</option>
                                            <option value="2008">2008</option>
                                            <option value="2009">2009</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2014">2014</option>
                                        </select>
                                    </div>
                                    <p style={{color:'#737373', fontSize:'16px', marginTop:"20px"}}>
                                        Essas informações não serão exibidas publicamente.
                                    </p>
                                </div>
                            </>
                        )}
                        {pagina === 2 && (
                            <>
                                <h2 style={{fontSize:'2rem', textAlign:"center"}}>Verificação</h2>
                                <p style={{color:'#737373', fontSize:'18px'}}>Digite o codigo enviado para <span style={{color:'black'}}>{email}</span></p>
                                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                                    <input 
                                        type="text" 
                                        style={{display:'block', outline:'none', borderRadius:'30px', width:"340px", height:"60px", fontSize:"20px", letterSpacing:"20px", textAlign:'center'}}
                                        value={codigoEntrada}
                                        onChange={handleCodigo}
                                    />
                                </div>
                                <small style={{color:'#737373', fontSize:"16px"}}>
                                    Não recebeste o codigo? aguarde alguns segundos e tente novamente.
                                </small>
                            </>
                        )}
                        {pagina === 3 && (
                            <>
                                <h2 style={{fontSize:'2rem', textAlign:"center"}} >Criar Senha</h2>
                                <p style={{color:'#737373', fontSize:'18px'}}>use uma senha forte para proteger a tua conta</p>
                                <div className={styles.inputArea}>
                                    <div className={focus3? styles.iconeFocusPerson : styles.iconePerson}>
                                        <i className="bi bi-lock" style={{fontSize: '22px'}}></i>
                                    </div>
                                    <input 
                                        type="password"
                                        className={styles.input}
                                        value={password}
                                        placeholder='Password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocus3(true)}
                                        onBlur={() => setFocus3(false)}
                                    />
                                </div>
                                <div className={styles.inputArea}>
                                    <div className={focus4? styles.iconeFocusPerson : styles.iconePerson}>
                                        <i className="bi bi-lock" style={{fontSize: '22px'}}></i>
                                    </div>
                                    <input 
                                        type="password"
                                        className={styles.input}
                                        value={confirmarPassword}
                                        placeholder='Comfirmar Password'
                                        onChange={(e) => setConfirmarPassword(e.target.value)}
                                        onFocus={() => setFocus4(true)}
                                        onBlur={() => setFocus4(false)}
                                    />
                                </div>
                                <small style={{color:'#737373'}}>
                                    Use pelo menos 8 caracteres, incluindo números e letras.
                                </small>
                            </>
                        )}
                        {pagina === 4 && (
                            <>
                                <h2 style={{fontSize:'2rem', textAlign:"center"}}>Nome do perfil</h2>
                                <p style={{color:'#737373', fontSize:'18px'}}>
                                Este será o nome exibido para outras pessoas.
                                </p>
                                <div className={styles.inputArea}>
                                    <div className={focus3? styles.iconeFocusPerson : styles.iconePerson}>
                                        <i className="bi bi-person" style={{fontSize: '22px'}}></i>
                                    </div>
                                    <input 
                                        type="text"
                                        className={styles.input}
                                        value={nomePerfil}
                                        placeholder='Nome do perfil'
                                        onChange={(e) => setNomePerfil(e.target.value)}
                                        onFocus={() => setFocus3(true)}
                                        onBlur={() => setFocus3(false)}
                                    />
                                </div>
                            </>
                        )}
                        {pagina === 5 && (
                            <>
                                <h2 style={{fontSize:'2rem', textAlign:"center"}}>Escolha um username</h2>
                                <p style={{color:'#737373', fontSize:'18px'}}>
                                Seu identificador único. Ex: @elias_dev
                                </p>

                                <div className={styles.inputArea}>
                                    <div className={focus4? styles.iconeFocusPerson : styles.iconePerson}>
                                        <i className="" style={{fontSize: '22px'}}>@</i>
                                    </div>
                                    <input 
                                        type="text"
                                        className={styles.input}
                                        value={userName}
                                        placeholder='username'
                                        onChange={(e) => setUserName(e.target.value)}
                                        onFocus={() => setFocus4(true)}
                                        onBlur={() => setFocus4(false)}
                                    />
                                </div>
                                <small style={{color:'#737373', fontSize:'16px'}}>
                                    Não pode conter espaços.
                                </small>
                            </>
                        )}
                    </form>
                </div>
                <div className={`${formularioValidado? styles.areaContinuar : styles.disabled}`}>
                    <button className={styles.butaoContinuar} onClick={handlerContinuar} disabled={!formularioValidado}>continuar</button>
                </div>
                </>
            )}
        </div>
            
    );
}