import { useState } from 'react';
import styles from './Card.module.css'

type props = {
    post_id: number;
    conteudo: string;
    perfil_id: number;
    username: string;
    nome: string;
    created_at: string;
}



export default function Card({ post_id, conteudo, perfil_id, username, nome, created_at }:props){

    return(
        <div className={styles.conteiner}>
            <div className={styles.perfil}>
                <div className={styles.userImage}></div>
            </div>
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <div className={styles.userInfo}>
                            <p>{nome}</p>
                            <p style={{color:"#737373", fontSize:"14px"}}>@{username}</p>
                        </div>
                        <div className={styles.dot}></div>
                        <p style={{color:"#737373"}}>{created_at}</p>
                    </div>
                    <i className="bi bi-three-dots" style={{color:"#737373"}}></i>
                </div>
                <div className={styles.content}>
                    {conteudo}
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