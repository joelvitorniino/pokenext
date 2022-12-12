import Image from "next/image"
import Link from "next/link"

import styles from '../../styles/Card.module.css'

export default function Card({pokemon}: any) {
    return (
        <div className={styles.card}>
            <Image src={`https://nexus.traction.one/images/pokemon/pokemon/${pokemon.id}.png`} width="120" height="120" alt={pokemon.name}/>
            <p className={styles.id}>#{pokemon.id}</p>
            <h1 className={styles.title}>{pokemon.name}</h1>
            <Link href={`/pokemon/${pokemon.id}`} className={styles.btn}>Detalhes</Link>
        </div>
    )
}