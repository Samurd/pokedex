import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from 'axios'
import { PokemonCard } from "../components/PokemonCard"
import { useNavigate } from "react-router-dom"

export function Pokedex() {

    const trainer = useSelector(state => state.trainer)
    const [pokemons, setPokemons] = useState([])
    const [data, setData] = useState([])
    const [isNull, setIsNull] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [PokemonSearched, setPokemonSearched] = useState('')
    const [typesPokemons, setTypesPokemon] = useState([])
    const [typePokemon, setTypePokemon] = useState("")
    const [offset, setOffset] = useState(1)
    
    const navigate = useNavigate()

    const getAllPokemons = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
        .then(res => setData(res.data))
        .catch(res => console.log(res))
    }

    const searchPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}`)
        .then(res => setPokemonSearched(res.data.name))
        .catch(error => console.log(error))
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
          searchPokemon()
        }
      }

      const isVisibleBtns = () => {
        if(data.results === undefined) {
           return ''
        } else {
           return(
            <>
            <button className="btn-pagination" onClick={() => offset === 1 ? setOffset(1) : setOffset(offset - 20)}>Anterior</button>
            <button className="btn-pagination" onClick={() => setOffset(offset + 20)}>Siguiente</button>
            </>            
           )
        }
      }

      const getTypesPokemons = () => {
        axios.get(`https://pokeapi.co/api/v2/type/`)
        .then(res => {
            setTypesPokemon(res.data.results)
            
        })
    }

    useEffect(() => {
        getAllPokemons()
    }, [])

    useEffect(() => {
        getAllPokemons()
    }, [offset])

    useEffect(() => {
        setPokemons(data.results === undefined ? data.pokemon : data.results)
        getTypesPokemons()
        setIsNull(false)
    }, [data])

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/type/${typePokemon === '' ? getAllPokemons()  : typePokemon + '/' }`)
        .then(res => {
            setData(res.data)
        })
    }, [typePokemon])


    useEffect(() => {
        navigate(`/pokedex/${PokemonSearched}`)
    }, [PokemonSearched])

    
    return(
        <main className="pokedex-main">
        <div className="container-title">
        <h1 className="reception">Bienvenido <strong>{trainer}</strong>, aqui podras ver tu pokemon favorito</h1>
        <div className="container-search-filter">
            <div className="container-search">
            <input type="search"  id="input-search" placeholder="Buscar un pokemon" onKeyDown={handleKeyDown} onChange={(e) => setSearchValue(e.target.value) }/>
            <button onClick={() => searchPokemon()} className="btn-search">Buscar</button>
            </div>

            <div className="container-filter">
            <select name="" id="" onChange={e => setTypePokemon(e.target.value)}>
                <option value="">All Pokemons</option>
                {typesPokemons?.map(type => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                ))}
            </select>
            </div>

            <div className="container-btns-pagination">
              {isVisibleBtns()}
            </div>
        </div>
        </div>
        <div className="container-cards">
            {pokemons?.length === 0 ? <p>No hay pokemones</p> : pokemons?.map(pokemon => (
                <PokemonCard key={pokemon.name === undefined ? pokemon.pokemon?.name : pokemon.name} url={pokemon.url === undefined ? pokemon.pokemon?.url : pokemon.url} />
            ))}
        </div>

        </main>
    )
}