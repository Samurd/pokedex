import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"


export function PokemonCard({url}) {
    const [LoadPokemons, setLoadPokemons] = useState(true)
    const [pokemon, setPokemon] = useState({})
    const [isLoad, SetIsload] = useState(true)

    useEffect(() => {
        axios.get(url)
        .then(res => {
            setPokemon(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get(url)
        .then(res => setPokemon(res.data))
    }, [url])

    useEffect(() => {
        setTimeout(() => {
           SetIsload(false)   
        }, 1000)
    }, [pokemon])


    return (
        <Link to={`/pokedex/${pokemon.name}`} className="container-card">
            <figure>
                <img src={pokemon.sprites?.other?.home?.front_default } alt={pokemon.name} />
            </figure>
            <div key={pokemon.name} className="container-main">
            <h2 className="name-pokemon-card">{pokemon.name}</h2>
            <div className="container-types">
            {pokemon.types?.map(type => (
                <p key={type.type?.name}>{type.type?.name}</p>
            ))}
            </div>
            <p className="type-pokemon">Tipo</p>
            </div>
        </Link>
    )
}