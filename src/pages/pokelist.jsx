import Axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { PokemonContext } from './PokemonContext';
import Pagination from '@material-ui/lab/Pagination';
import qs from "query-string"


export default ({}) => {
  const match = useRouteMatch()
  const history = useHistory()
  const location = useLocation()
  const path = match.path
  const queryPage = qs.parse(location.search).page ? qs.parse(location.search).page : 1
  const limit = 20

//   const [page, setPage] = useState(queryPage)
  const { pokemonTotalCount, pokemons, capture, initPokemons } = useContext(PokemonContext);
  const totalpages = Math.ceil(pokemonTotalCount / 20);
//   console.log(pokemonTotalCount)

  useEffect(() => {
    const getPokemons = () => {
      Axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(queryPage-1)*limit}&limit=20`)
        .then(res => {
            console.log(res)
            initPokemons(res.data.results, res.data.count);
        })
        .catch(err => {
            console.log(err);
        });
    };
     getPokemons();
  }, [queryPage]);

  const renderPokemon = ({ list }) => {
    return list.map((pokemon, id)=>{
        return (
            <Link to={`${path}/${pokemon.name}`} style={{textDecoration : 'none'}}>
                <div className="my-1 text-dark">
                    {((queryPage-1)*limit)+id+1+'. '}{pokemon.name}
                </div>
            </Link>
        )
    })
  };

  const handleRoute = (url) => {
    history.push(url);
  }

  return (

    <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center h-full">
        <h1>This is Pokelist</h1>
        {renderPokemon({list : pokemons})}
        <Pagination
          count={totalpages}
          page={parseInt(queryPage)}
          onChange={(e, page) => handleRoute(`${path}?page=${page}`, page)}
          color="secondary"
          siblingCount={1}
        />
        </div>
    </div>
  );
};
