import React, { useRef } from 'react'
import { setTrainerSlice } from '../store/slices/trainer.slice'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/HomePage.css'

const HomePage = () => {

    const inputTrainer = useRef()
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const hanldeTrainer = e => {
        e.preventDefault()
        dispatch(setTrainerSlice(inputTrainer.current.value.trim()))
        navigate('/pokedex')

    }

    return (
        <div className='container__principal'>
            <header className='color__idi'>
                <div className='imges__pokeid'>
                    <img src="./images/logo.png" alt="" />
                </div>
                <div className='bolas__pokeid'>
                    <img src="./images/bola-pokemon.png" alt="" />
                </div>
            </header>
            <div className='color__classs'></div>
            <div className='home__poke'>
                <section className='color__home'>
                    <div className='login'>
                        <h1 className='tittle__poke'>Pokedex</h1>
                        <h2 className='subtitle__poke'>HI! Trainer!</h2>
                        <h3 className='saludo__poke'>To start, please, enter you trainer nickname</h3>
                        <form onSubmit={hanldeTrainer}>
                            <input className='searchinput__poke' placeholder='UserName' ref={inputTrainer} type="text" />
                            <button className='button__search'>Start!</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default HomePage