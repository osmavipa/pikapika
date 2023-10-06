import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'

const SelectType = ({setTypeSelected}) => {

    const url = 'https://pokeapi.co/api/v2/type'

    const [types, getTypes] = useFetch(url)

    useEffect(() => {
        getTypes()
    },[])

    const handleChange = e => {
    setTypeSelected(e.target.value)
    }

    return (
        <div className='poke__typeselect'>
            <select className='poke__select' onChange={handleChange}>
                <option className='poke__option' value='allPokemons'>All Pokemons</option>
                {
                    types?.results.map(typeInfo => (
                        <option  className='poke__itemoption' key={typeInfo.url} value={typeInfo.url}>{typeInfo.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectType