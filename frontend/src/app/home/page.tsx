import Header from "@/component/header/Header";
import styles from "./home.module.css"
import FeedNav from "@/component/feedNav/FeedNav";
import Conteudo from "@/component/conteudo/Conteudo";

export default function Home(){
    return(
        <div className={styles.conteiner}>
            <div className={styles.main}>
                <Header/>
                <FeedNav/>
                <Conteudo/>
            </div>
        </div>
    );
}