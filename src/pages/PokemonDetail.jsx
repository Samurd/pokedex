import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function PokemonDetail() {
   const {name} = useParams();
   const [pokemon, setPokemon] = useState({});

   const navigate = useNavigate()

   useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => {
        setPokemon(res.data);
    })
   }, [])


   return(
    <>
    <header>
        <nav>
            <span onClick={() => navigate(-1)}>
            <i className='bx bx-left-arrow-alt'></i>
            Volver
            </span>
        </nav>
    </header>
        <main className="pokemon-detail-main">
        <section className="section-pokemon">
            <div className="container-img">
            <figure>
                <img src={pokemon.sprites?.other?.home?.front_default} alt={pokemon.name} />
            </figure>
            </div>
            <article>
                <div className="container-name-id">
                <h2 className="id-pokemon">#{pokemon.id}</h2>
                <h2 className="name-pokemon">{pokemon.name}</h2>
                </div>
                <div className="container-weight-height">
                    <div className="con-wei">
                        <p>Peso</p>
                        <h3>{pokemon.weight} kg</h3>
                    </div>
                    <div className="con-hei">
                        <p>Altura</p>
                        <h3>{pokemon.height} m</h3>
                    </div>
                </div>

                <div className="container-types-detail">
                    <div className="wrapper-types">
                        <h4 className="type-detail detail">Tipo</h4>
                        <div className="container-detail--types">
                            {pokemon.types?.map(type => (
                                <h3 key={type.type?.name}>{type.type?.name}</h3>
                            ))}
                        </div>
                    </div>
                    <div className="wrapper-skills">
                        <h4 className="skills-detail detail">Habilidades</h4>
                        <div className="container-detail--skills">
                        {pokemon.abilities?.map(ability => (
                                <h3 key={ability.ability?.name}>{ability.ability?.name}</h3>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </section>
        <section className="section-movements">
            <h2>Moviemientos</h2>
            <div className="container-movements">
                {pokemon.moves?.map(poke=> (
                    <p className="move-pokemon" key={poke.move?.name}>{poke.move?.name}</p>
                ))}
            </div>
        </section>
    </main>
    </>
   )
}