'use client'
import Link from 'next/link';
import styles from './login.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const response = await fetch('/api/user/login?op=login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 🔥 importante
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.message || 'Erro no login');
                return;
            }

            const data = await response.json();
            console.log('DATA:', data);
            

            if(data.sucesso){
                alert('Login realizado com sucesso');
                router.push('/home');
            }

        }catch(error){
            console.error(error);
            alert('Erro na requisição');
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className={styles.conteiner}>
            <div className={styles.areaForm}>
                <h2 style={{marginBottom:"25px", fontSize:"2rem", textAlign:"center"}}>Login</h2>

                <form className={styles.form} onSubmit={login}>
                    
                    <div className={styles.inputArea}>
                        <div className={focus1? styles.iconeFocus : styles.icone}>
                            <i style={{fontSize:"22px"}}>@</i>
                        </div>
                        <input 
                            type="email" 
                            className={styles.input}
                            value={email}
                            placeholder='Username ou Email'
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocus1(true)}
                            onBlur={() => setFocus1(false)}
                        />
                    </div>

                    <div className={styles.inputArea}>
                        <div className={focus2? styles.iconeFocus : styles.icone}>
                            <i className='bi bi-lock' style={{fontSize:"22px"}}></i>
                        </div>
                        <input 
                            type="password" 
                            className={styles.input}
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocus2(true)}
                            onBlur={() => setFocus2(false)}
                        />
                    </div>

                    <div className={styles.areaLogin}>
                        <button type="submit" disabled={loading} className={styles.butaoLogin}>
                            {loading ? 'Entrando...' : 'Login'}
                        </button>
                    </div>

                </form>

                <div style={{display:"flex", justifyContent:"center"}}>
                    <Link href={'/'} style={{fontSize:"20px", color:"#737373"}}>
                        Esqueceu a senha?
                    </Link> 
                </div>

                <div className={styles.ou}>
                    <div style={{display: "flex", flexDirection:"column", justifyContent:"center", width:"165px"}}><hr style={{color:"#D9D9D9"}}/></div>
                    <p>OU</p>
                    <div style={{display: "flex", flexDirection:"column", justifyContent:"center", width:"165px"}}><hr style={{color:"#D9D9D9"}}/></div>
                </div>

                <div className={styles.areaRegister}>
                    <Link className={styles.butaoRegister} href={'/auth/register'}>
                        Criar conta
                    </Link>
                </div>

            </div>
        </div>
    );
}