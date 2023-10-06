import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import './PokedexId.css'

const PokedexIdPage = () => {

    const { id } = useParams()

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const [pokemon, getPokemon] = useFetch(url)

    useEffect(() => {
        getPokemon()
    }, [id])

    console.log(pokemon)

    const getColorClass = (value) => {
        if (value < 43) {
            return 'low';
        } else if (value < 70) {
            return 'medium';
        } else {
            return 'high';
        }
    };


    return (
        <>
            <div className='container'>
            <header className='color__header'>
                <div className='img__poke'>
                    <img src="./images/logo.png" alt="" />
                </div>
                <div className='bola__poke'>
                    <img src="./images/bola-pokemon.png" alt="" />
                </div>
            </header>
            <div className='color'></div>
            <div className='container__f'>
            <article className={`pokeId ${pokemon?.types[0].type.name}-border`}>
                    <section className={`pokeId__header ${pokemon?.types[0].type.name}-gradient`} >
                        <img className='pokeId__img'
                            src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                    </section>
                    <section className='pokeId__id'>
                        <h1 className={`pokeId__number ${pokemon?.types[0].type.name}-color`}># {id}</h1>
                        <h2 className={`pokeId__name ${pokemon?.types[0].type.name}-color`}>{pokemon?.name}</h2>
                    </section>
                    <section className='pokeId__list'>
                        <ul className='pokeId__items'>
                            <li className='pokeId__item1'>
                                <h3 className='pokeId__weigth'>Weigth</h3>
                                {pokemon?.weight}
                            </li>
                            <li className='pokeId__item2'>
                                <h3 className='pokeId__heigth'>Heigth</h3>
                                {pokemon?.height}
                            </li>
                        </ul>
                    </section>
                    <section className='pokeId__type'>
                        <div className='pokeId__types'>
                            <div className='pokeId__type-list'>
                                <h2 className='pokeId__h2'>Type</h2>
                                <ul className='pokeId__typename-list'>
                                    {pokemon?.types.map(typeInfo => (
                                        <li className={`pokeId__typename ${pokemon?.types[0].type.name}-gradient ${typeInfo.type.name}-gradient`} key={typeInfo.type.url}>
                                            {typeInfo?.type.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='pokeId__type-list'>
                                <h2 className='pokeId__h2'>Abilities</h2>
                                <ul className='pokeId__abiliti-list'>
                                    {pokemon?.abilities.map(abiliInfo => (
                                        <li className='pokeId__abiliti' key={abiliInfo.ability.url}>
                                            {abiliInfo?.ability.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className='progress__container'>
                        <ul >
                            {
                                pokemon?.stats.map(statInfo => (
                                    <li key={statInfo.stat.url}>
                                        <p><span className='stat__name'>{statInfo.stat.name}:</span><span>{statInfo.base_stat}/150</span></p>
                                        <div className='progress__container'>
                                            <div className='skill'>
                                                <div className={`progress ${getColorClass(statInfo.base_stat)}`} style={{ width: `${statInfo.base_stat}%` }}></div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                </article>
            </div>
            <div className='margen'>
                <article className={`pokemovements ${pokemon?.types[0].type.name}-border`}>
                    <section>
                        <h2 className='move__h2'>Movements</h2>
                        <ul className='move__list'>
                            {
                                pokemon?.moves.slice(0, 30).map(moveInfo => (
                                    <li className='move__items' key={moveInfo.move.url}>
                                        {moveInfo?.move.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                </article>
            </div>
            </div>
        </>

    )
}

export default PokedexIdPage