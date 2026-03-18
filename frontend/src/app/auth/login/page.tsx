import Link from 'next/link';
import styles from './login.module.css'

export default function login(){
    return(
        <div className={styles.conteiner}>
            <div style={{backgroundColor:""}}>
                <form className={styles.form}>
                    <div className={styles.email}>
                        <label className={styles.label}>Email</label>
                        <input type="email" className={styles.input}/>
                    </div>
                    <div className={styles.password}>
                        <label className={styles.label}>password</label>
                        <input type="password" className={styles.input}/>
                    </div>
                    <div>
                        <button type="submit">submeter</button>
                    </div>
                </form>
                <div className={styles.register}>
                    <Link href={'/auth/register'}>criar conta</Link>
                </div>

            </div>
        </div>
    );
}