import { InferGetStaticPropsType } from 'next';
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
    <div>
      <h1>PokeNext</h1>
      <ul>
        {pokemons.map((pokemon) => {
          return (
            <li key={pokemon.id}>{pokemon.name}</li>
          )
        })}
      </ul>
    </div>
  );  
}
