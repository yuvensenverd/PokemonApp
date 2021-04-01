import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
export default ({}) => {

const match = useRouteMatch();
const { pokemon } = match.params
  return (
    <div className="">
      <h1>This is {pokemon}</h1>
    </div>
  );
};
