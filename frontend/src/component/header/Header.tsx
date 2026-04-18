'use client'
import { useState } from 'react';
import FeedNav from '../feedNav/FeedNav'
import styles from './Header.module.css'

export default function Header(){

    const [modalOpen, setModalOpen] = useState(false);
    
    return(
        <>
            <div className={styles.conteiner}>
                <div className={styles.header}>
                    <i className={`bi bi-list ${styles.icone}`} onClick={() => setModalOpen(true)}></i>
                    <div className={styles.logo}>
                        Logo
                    </div>
                </div>
                <FeedNav/>
            </div>
            {
                modalOpen && (
                    <div className={styles.overlay}>
                        <div className={styles.modal}>
                            <div className={styles.headerSideBar}>
                                <div className={styles.userInfo}>
                                    <div className={styles.perfil}>
                                        <div className={styles.userImage}></div>
                                        <div className={styles.userPerfil}>
                                            <div className={styles.perfilName}>Minine</div>
                                            <div className={styles.userName}>@mateumini</div>
                                        </div>
                                    </div>
                                    <div className={styles.status}>
                                        <div className={styles.seguindo}>1 seguindo</div>
                                        <div className={styles.seguidores}>10 seguidores</div>
                                    </div>
                                </div>
                                <div className={styles.closeModal}>
                                    <i className={`bi bi-x ${styles.icone}`} onClick={() => setModalOpen(false)} style={{fontSize:"32px"}}></i>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                )
            }
        </>
    )
}