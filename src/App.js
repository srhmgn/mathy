import React from 'react';
import './App.css';

import math from './utils/math';

const App = () => {
  const [ints, answer] = math();
  return (
    <div className="wrapper">
      {ints.map((int, i) => (
        <div className="box box--int" key={i}>
          <div className="box-inner">{int}</div>
        </div>
      ))}
      <div className="box box--answer">
        <div className="box-inner">{answer}</div>
      </div>
    </div>
  );
};

export default App;
