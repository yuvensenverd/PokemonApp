import Axios from 'axios';
import React, { useState, useEffect } from 'react';


export default ({}) => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        });
 
    }, []);

  return (

    <div className="container">

        <div className="d-flex flex-column justify-content-center align-items-center h-full">
        <h1>This is Pokelist</h1>
        </div>
    </div>
  );
};
