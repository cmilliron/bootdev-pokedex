import { State } from "./state";

export async function commandDisplayPokedex(state: State) {
    if (!state.pokedex) {
        console.log("Your pokedex is empty. Let's catch them all.");
    } else {
        console.log("Your Pokedex:")
        for (const pokemon of Object.keys(state.pokedex)) {
            console.log(`  - ${pokemon}`)
        }
    }
    const pokedexKeys = state.pokedex;
};
