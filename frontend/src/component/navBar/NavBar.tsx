'use client'
import Link from "next/link";
import styles from "./NavBar.module.css"
import { useState } from "react";

export default function NavBar(){
    const [ativo, setAtivo] = useState('home')
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
                        <button className={styles.navButton} onClick={() => setAtivo('plus')}>
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
        </>
    )
}