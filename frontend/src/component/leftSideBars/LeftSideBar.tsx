import Link from "next/link";
import styles from './LeftSideBar.module.css'
import NavBar from "../navBar/NavBar";
import MoreOptions from "../moreOpitions/MoreOptions";

export default function Nav(){

    return(
        <>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <h1>logo</h1>
                </div>
                <div className={styles.NavBar}>
                    <NavBar />
                </div>
                <div className={styles.moreOptions}>
                    <MoreOptions />
                </div>
            </div>
        </>
    )
}