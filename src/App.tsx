import './scripts/index.ts'
import './App.css'
import { useEffect, useState } from 'react';

const fetchPokemon = async ():Promise<[{name:string, url:string}]> => {
  const results = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=60&offset=60`);
  if(!results.ok){
    throw new Error(`Failed to fetch pokemon`);
  }
  const data = await results.json();
  console.log(data);

  return data.results;
}

function App() {
const [pokemons, setPokemons] = useState<{name: string, url: string}[]>([]);

useEffect(() => {
  fetchPokemon().then(data => setPokemons(data));
}, []);


  return (
    <>
      <div>
        <ul>
          {
            pokemons.map((item, index) => {
              return (
                <li key={index}>
                  {item.name}
                </li>
              )
            }) 
          }
        </ul>
      </div>
    </>
  )
}

export default App
