import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    // console.log(args)
    if (args.length !== 1) {
         throw new Error("location name require.\n\nExplore pastoria-city-area ");
    }
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