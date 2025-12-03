import { Pokedex, type State } from "./state.js";
import { Pokemon } from "./pokemon_type.js";

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
    const pokemon = await state.pokeAPI.fetchPokemon(args[0]);
    // console.log(response)
    console.log(`Base Experience of pokemon: ${pokemon.base_experience}`);
    const catchChance =
      pokemon.base_experience / 2 +
      Math.round(Math.random() * pokemon.base_experience);
    console.log(`Chance of Catching Pokemon: ${catchChance}`);
    if (catchChance > pokemon.base_experience) {
      console.log(`You caught ${pokemon.name}`);
      state.pokedex[pokemon.name] = pokemon;
    } else console.log("Pokemon got away.");
  } catch (error) {
    console.log("There was an error fetching your data. Try again later.");
  }
}
