import styles from './Card.module.css'

export default function Card(){

    return(
        <div className={styles.conteiner}>
            <div className={styles.perfil}>
                <div className={styles.userImage}></div>
            </div>
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <div className={styles.userInfo}>
                            <p>Minine</p>
                            <p style={{color:"#737373", fontSize:"14px"}}>@mateumini</p>
                        </div>
                        <div className={styles.dot}></div>
                        <p style={{color:"#737373"}}>feb 13</p>
                    </div>
                    <i className="bi bi-three-dots" style={{color:"#737373"}}></i>
                </div>
                <div className={styles.content}>
                    They ara whacking the South Koreans bad and the 
                    Brazilians came in like the avengers to add i've 
                    got tears in my eyes
                </div>
                <div className={styles.status}>
                    <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                        <i className="bi bi-chat" style={{color:"#737373"}}></i>
                        <p style={{fontSize:"12px", color:"#737373"}}>63</p>
                    </div>
                    <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                        <i className="bi bi-repeat" style={{color:"#737373"}}></i>
                        <p style={{fontSize:"12px", color:"#737373"}}>1.2K</p>
                    </div>
                    <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                        <i className="bi bi-heart" style={{color:"#737373"}}></i>
                        <p style={{fontSize:"12px", color:"#737373"}}>45K</p>
                    </div>
                    <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                        <i className="bi bi-reception-3" style={{ alignSelf:"flex-start", color:"#737373"}}></i>
                        <p style={{fontSize:"12px", color:"#737373"}}>442K</p>
                    </div>
                    <i className="bi bi-bookmark" style={{fontSize:"21px", color:"#737373"}}></i>
                </div>
            </div>
        </div>
    )
}