'use client'

import { useState } from 'react';
import styles from './FeedNav.module.css'

export default function FeedNav(){

    const [ativo, setAtivo] = useState('rec');

    return(
        <nav className={styles.nav}>
            <li 
                className={styles.navItem} 
                onClick={(e) => setAtivo('rec')}
            >
                <p className={ativo === 'rec'? styles.ativo : styles.item}>Recomendação</p>
            </li>
            <li 
                className={styles.navItem} 
                onClick={(e) => setAtivo('seg')}
            >
                <p className={ativo === 'seg'? styles.ativo : styles.item}>Seguindo</p>
            </li>
        </nav>
    );
}