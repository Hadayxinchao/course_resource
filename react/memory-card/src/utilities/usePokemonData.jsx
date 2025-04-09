import { useState, useMemo } from "react";

export default function usePokemonData(count = 12) {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useMemo(() => {
    async function fetchPokemon() {
      try {
        setIsLoading(true);
        const promises = [];
        for (let i = 1; i <= count; i++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
          promises.push(
            fetch(url)
              .then((response) => response.json())
              .catch((error) => setError(error))
          );
        }
  
        const pokemons = await Promise.all(promises);
        const formattedData = pokemons.map((pokemon) => ({
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          id: pokemon.id,
          isClicked: false
        }));

        setPokemonData(formattedData);
      }
      catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPokemon();
  }, [count]);

  return { pokemonData, isLoading, error };
}
