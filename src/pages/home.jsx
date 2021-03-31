import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default () => {
    const [data, setData] = useState([]);

    useEffect(() => {

        Axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=50`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        });
 
    }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-full">
      <h1 className="mb-3">This is Home</h1>
      <div className="d-flex flex-column justify-content-center align-items-center">
          <Link to="/poke-list">
            <div className="btn btn-danger mb-4">
                Pokemon List
            </div>
          </Link>
          <Link to="/poke-list">
            <div className="btn btn-primary mb-4">
                My Pokemon
            </div>
          </Link>
      </div>
    </div>
  );
};
