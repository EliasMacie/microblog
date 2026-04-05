'use client'
import Link from 'next/link';
import styles from './login.module.css'
import { useState } from 'react';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    return(
        <div className={styles.conteiner}>
            <div className={styles.areaForm}>
                <h2 style={{marginBottom:"25px", fontSize:"2rem", textAlign:"center"}}>Login</h2>
                <form className={styles.form}>
                    <div className={styles.inputArea}>
                        <div className={focus1? styles.iconeFocus : styles.icone}>
                            <i className='' style={{fontSize:"22px"}}>@</i>
                        </div>
                        <input 
                            type="email" 
                            className={styles.input}
                            value={email}
                            placeholder='Username ou Email'
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => setFocus1(true)}
                            onBlur={(e) => setFocus1(false)}
                        />
                    </div>
                    <div className={styles.inputArea}>
                        <div className={focus2? styles.iconeFocus : styles.icone} >
                            <i className='bi bi-lock' style={{fontSize:"22px"}}></i>
                        </div>
                        <input 
                            type="password" 
                            className={styles.input}
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => setFocus2(true)}
                            onBlur={(e) => setFocus2(false)}
                        />
                    </div>
                    <div className={styles.areaLogin}>
                        <button type="submit" className={styles.butaoLogin}>Login</button>
                    </div>
                </form>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Link href={'/'} style={{fontSize:"20px", color:"#737373"}}>Esqueceu a senha?</Link> 
                </div>
                <div className={styles.ou}>
                    <div style={{display: "flex", flexDirection:"column", justifyContent:"center", width:"165px"}}><hr style={{color:"#D9D9D9"}}/></div>
                    <p>OU</p>
                    <div style={{display: "flex", flexDirection:"column", justifyContent:"center", width:"165px"}}><hr style={{color:"#D9D9D9"}}/></div>
                </div>
                <div className={styles.areaRegister}>
                    <Link className={styles.butaoRegister} href={'/auth/register'}>criar conta</Link>
                </div>

            </div>
        </div>
    );
}