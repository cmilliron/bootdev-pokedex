import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    // console.log(args)
  try {
    const response = await state.pokeAPI.fetchLocation(args[0]);
    // console.log(response)
    console.log(`Exploring ${response.name}...\nFound Pokemon:`)
    const pokemonList = response.pokemon_encounters;
    for (const p of pokemonList){
        console.log(` - ${p.pokemon.name}`)
    }
  } catch (error) {
    console.log("There was an error fetching your data. Try again later.");
  }
}