import styles from './Header.module.css'

export default function Header(){
    
    return(

        <>
            <div className={styles.conteiner}>
                <i className={`bi bi-list ${styles.icone}`}></i>
                <div className={styles.logo}>
                    Logo
                </div>
            </div>
        </>
    )
}