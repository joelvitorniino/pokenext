import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css'

interface PokeAPI {
  results: [{
    name: string,
    id: number
  }]
}

export async function getStaticProps() {
  const maxPokemons = 251;
  const api = 'https://pokeapi.co/api/v2/pokemon';

  const res = await fetch(`${api}?limit=${maxPokemons}`);
  const data: PokeAPI = await res.json();

  // add pokemon index
  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results
    }
  }
}

export default function Home({ pokemons }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Poke<span>Next</span></h1>
        <Image src="/images/pokeball.png" width="50" height="50" alt='PokeNext' />
      </div>
      <div className={styles.pokemon_container}>
        {pokemons.map((pokemon) => {
          return (
            <p key={pokemon.id}>{pokemon.name}</p>
          )
        })}
      </div>
    </>
  );  
}
