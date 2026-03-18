import Link from "next/link";
import styles from "./NavBar.module.css"

export default function NavBar(){

    return(
        <>
            <nav className={styles.navBar}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><Link href={'./'} className={styles.navLink}>Home</Link></li>
                    <li className={styles.navItem}><Link href={'./'} className={styles.navLink}>Search</Link></li>
                    <li className={styles.navItem}><Link href={'./'} className={styles.navLink}>Add Post</Link></li>
                    <li className={styles.navItem}><Link href={'./'} className={styles.navLink}>Liked Post</Link></li>
                    <li className={styles.navItem}><Link href={'./'} className={styles.navLink}>Profile</Link></li>
                </ul>
            </nav>
        </>
    )
}