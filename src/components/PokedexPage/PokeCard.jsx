import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import './styles/PokeCard.css'

const PokeCard = ({ url }) => {

    const [pokemon, getPokemon] = useFetch(url)

    useEffect(() => {
        getPokemon()
    }, [])

    console.log(pokemon)

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }

    return (
        <article className={`pokecard  ${pokemon?.types[0].type.name}-border`} onClick={handleNavigate}>
            <header className={`pokecard__header ${pokemon?.types[0].type.name}-gradient`}>
                <img
                    className="pokecard__img"
                    src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section className="pokecard__body">
                <h3 className={`pokecard__name ${pokemon?.types[0].type.name}-color`}>{pokemon?.name}</h3>
                <ul className="pokecard__types">
                    {
                        pokemon?.types.map(typeInfo => (
                            <li className="pokecard__typename" key={typeInfo.type.url}>{typeInfo?.type.name}</li>
                        ))
                    }
                </ul>
                <hr className="pokecard__hr" />
                <ul className="pokecard__stats">
                    {
                        pokemon?.stats.map(statInfo => (
                            <li className="pokecard__stat" key={statInfo.stat.url}>
                                <h4 className="pokecard__stat__name">{statInfo.stat.name}</h4>
                                <span className={`pokecard__stat__value ${pokemon?.types[0].type.name}-color`}>{statInfo.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}

export default PokeCard