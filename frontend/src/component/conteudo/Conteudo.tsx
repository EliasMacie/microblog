import Card from '../post/Card';
import styles from './Conteudo.module.css'

export default function Conteudo(){
    return(
        <div className={styles.conteiner}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    );
}