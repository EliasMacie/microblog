'use client'
import Link from "next/link";
import styles from "./NavBar.module.css"
import { useState } from "react";

export default function NavBar(){
    const [ativo, setAtivo] = useState('home')
    const [modalOpen, setModalOpen] = useState(false)
    const [postContent, setPostContent] = useState('');

    const clickAdd = () => {
        setAtivo('plus');
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setAtivo('home');
    }

    const post = async ()  => {
        try{
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: postContent })
            })
        }catch(error){
            console.error(error);
        }
    };
    return(
        <>
            <nav className={styles.navBar}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <button className={styles.navButton} onClick={() => setAtivo('home')}>
                            <i className={ativo == 'home'? "bi bi-house-fill" : "bi bi-house"} style={{fontSize:"24px"}}></i>
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <button className={styles.navButton} onClick={() => setAtivo('search')}>
                            <i className={ativo === 'search'? "bi bi-search" : "bi bi-search"} style={{fontSize:"24px"}}></i>
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <button className={styles.navButton} onClick={clickAdd}>
                            <i className={ativo === 'plus'? "bi bi-plus-circle-fill" : "bi bi-plus-circle"} style={{fontSize:"24px"}}></i>
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <button className={styles.navButton} onClick={() => setAtivo('heart')}>
                            <i className={ativo === 'heart'? "bi bi-heart-fill" : "bi bi-heart"} style={{fontSize:"24px"}}></i>
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <button className={styles.navButton} onClick={() => setAtivo('bell')}>
                            <i className={ativo === 'bell'? "bi bi-bell-fill" : "bi bi-bell"} style={{fontSize:"24px"}}></i>
                        </button>
                    </li>
                </ul>
            </nav>
            {
                modalOpen && (
                    <div className={styles.overlay}>
                        <div className={styles.modal}>
                            <div className={styles.closeModalArea}>
                                <button className={styles.closeModalButton} onClick={() => closeModal()}><i className={`bi bi-x ${styles.closeModal}`} style={{fontSize:"2rem"}}></i></button>
                            </div>

                            <div className={styles.textArea}>
                                <textarea 
                                    placeholder="What's happening?" 
                                    className={styles.text} 
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                />
                            </div>
                            <div className={styles.buttonArea}>
                                <button className={styles.post} onClick={post}>Post</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}