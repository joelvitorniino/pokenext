import { InferGetStaticPropsType } from "next";
import { PokeAPI } from "..";

import styles from '../../styles/Pokemon.module.css';

import Image from 'next/image'
import { useRouter } from "next/router";

interface Poke {
    forms: [{
        name: string;
    }],
    id: number;
    types: [{
        type: {
            name: string
        } 
    }],
    height: number;
    weight: number;
}

export const getStaticPaths = async() => {
    const maxPokemons = 251;
    const api = 'https://pokeapi.co/api/v2/pokemon';
  
    const res = await fetch(`${api}?limit=${maxPokemons}`);
    const data: PokeAPI = await res.json();

    // params
    const paths = data.results.map((pokemon, index) => {
        return {
            params: { pokemonId: (index + 1).toString() }
        }
    });

    return {
        paths,
        fallback: true
    }
};

export const getStaticProps = async(context: any) => {
    const id = context.params.pokemonId;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const data: Poke = await res.json();

    return {
        props: {
            pokemon: {
                data
            }
        }
    };
};

export default function Pokemon({ pokemon }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if(router.isFallback) {
        return (
            <div>Carregando...</div>
        );
    };
    
    return (
        <div className={styles.pokemon_container}> 
            <h1 className={styles.title}>{ pokemon.data.forms[0].name }</h1>
            <Image 
            src={`https://nexus.traction.one/images/pokemon/pokemon/${pokemon.data.id}.png`} 
            width="250" 
            height="250" 
            alt='PokeNext' 
            />
            <div>
                <h3>Número:</h3>
                <p>#{pokemon.data.id}</p>
            </div>
            <div>
                <h3>Tipo:</h3>
                <div className={styles.types_container}>
                    {pokemon.data.types.map((item, index) => {
                        return (
                            <span key={index} className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}</span>
                        )
                    })}
                </div>
            </div>
            <div className={styles.data_container}>
                <div className={styles.data_height}>
                    <h4>Altura:</h4>
                    <p>{pokemon.data.height * 10} cm</p>
                </div>
                <div className={styles.types_weight}>
                    <h4>Peso:</h4>
                    <p>{pokemon.data.weight / 10}kg</p>
                </div>
            </div>
        </div>
    )
}