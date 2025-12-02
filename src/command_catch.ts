import type { State } from "./state.js";


//TODO - Be sure to print the Throwing a Pokeball at <pokemon>... message before determining if the Pokemon was caught or not.
//TODO - Use the Pokemon endpoint to get information about a Pokemon by name.
//TODO - Give the user a chance to catch the Pokemon using the Math.random() static method.
//TODO - You can use the pokemon's "base experience" to determine the chance of catching it. The higher the base experience, the harder it should be to catch.
//TODO - Once the Pokemon is caught, add it to the user's Pokedex. The user's "pokedex" should just be a Record<string, Pokemon> (a map of Pokemon by name) stored in the State object.
//TODO - Test the catch command manually - make sure you can actually catch a Pokemon within a reasonable number of tries.


export async function commandCatch(state: State, ...args: string[]) {
    // console.log(args)
    if (args.length !== 1) {
         throw new Error(`Throwing a Pokeball at ${args[0]}...`);
    }
  try {
    const response = await state.pokeAPI.fetchPokemon(args[0]);
    // console.log(response)
    console.log(`Exploring ${response.name}...\nFound Pokemon:`)
    // const pokemonList = response.pokemon_encounters;
    // for (const p of pokemonList){
    //     console.log(` - ${p.pokemon.name}`)
    // }
  } catch (error) {
    console.log("There was an error fetching your data. Try again later.");
  }
}