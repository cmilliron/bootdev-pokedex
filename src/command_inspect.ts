import { Pokedex, type State } from "./state.js";
import { Pokemon } from "./pokemon_type.js";


export async function commandInspect(state: State, ...args: string[]) {
  // console.log(args)
  if (args.length !== 1) {
    throw new Error(`You must ender a name of a pokemon. \n-> inspect squirtle`);
  }
  const pokemon = args[0]
  if (state.pokedex[pokemon]) {
    displayPokemon(state.pokedex[pokemon])
  } else {
    console.log("you have not caught that pokemon")
  }

}

function displayPokemon(pokemon: Pokemon) {
    console.log(`Name: ${pokemon.name}`)
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log('Stats:')
    for (const stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`)
    }
    console.log('Types:')
    for (const type of pokemon.types) {
        console.log(`  -${type.type.name}`)
    }
}