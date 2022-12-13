import { InferGetStaticPropsType } from "next";
import { PokeAPI } from "..";

interface Poke {
    forms: [{
        name: string;
    }]
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
        fallback: false
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
    return (
        <p>{pokemon.data.forms[0].name}</p>
    )
}