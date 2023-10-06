import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './styles/PokedexPage.css'

const PokedexPage = () => {

    const [inputValue, setInputValue] = useState('')
    const [typeSelected, setTypeSelected] = useState('allPokemons')
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 20;

    const trainer = useSelector(store => store.trainer)



    const inputSearch = useRef()

    const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=200'
    const [pokemons, getPokemons, getTypePokemon] = useFetch(url)



    useEffect(() => {

        if (typeSelected === 'allPokemons') {
            getPokemons()
        } else {
            getTypePokemon(typeSelected)
        }


    }, [typeSelected])

    const handleSearch = e => {
        e.preventDefault()
        setInputValue(inputSearch.current.value.trim().toLowerCase())
    }

    const pokeFiltered = pokemons?.results.filter(poke => poke.name.includes(inputValue))

    //logica para la paginacion 
    //...

    //logica para la paginacion 
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const pokeFilteredAndPaged = pokeFiltered?.slice(
        indexOfFirstCard,
        indexOfLastCard
    ) || [];

    const totalPages = Math.ceil((pokeFiltered?.length || 0) / cardsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };



    return (
        <div>
            <header className='color__id'>
                <div className='img__pokeid'>
                    <img src="./images/logo.png" alt="" />
                </div>
                <div className='bola__pokeid'>
                    <img src="./images/bola-pokemon.png" alt="" />
                </div>
            </header>
            <div className='color__class'></div>
                <div className="space__poke"><p className="poke__saludo">Hi Trainer <span className="trainer-text"> {trainer} </span></p></div>
                <h3 className="poke__h3">you can search for your pokemon</h3>
                <h3 className="poke__h3">by name</h3>
                <form className="poke__form" onSubmit={handleSearch}>
                    <input className="poke__input" ref={inputSearch} type="text" placeholder="Name Pokemon" />
                    <button className="poke__search">Search</button>
                </form>
                <h3 className="poke__h3">or type</h3>
                <SelectType setTypeSelected={setTypeSelected} />
            <div className="pagination">
                <button
                    className="next"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    <i className='bx bxs-skip-previous-circle' ></i>
                </button>
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`btn ${pageNumber === currentPage ? "active-btn" : ""}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    className="next"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                >
                    <i className='bx bxs-skip-next-circle'></i>
                </button>
            </div>
            <div className="container__poke">
                {pokeFilteredAndPaged.map((poke) => (
                    <PokeCard key={poke.url} url={poke.url} />
                ))}
            </div>
        </div>
    )
}

export default PokedexPage