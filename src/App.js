import React from 'react';
import './App.css';
import PokePages from './Components/Pokemons/PokePages';
function App() {
  

  return (
    <div className="App">
        <PokePages start={localStorage.getItem('page') ? parseInt(localStorage.getItem('page')) : 0} />
    </div>
  );
}

export default App;
