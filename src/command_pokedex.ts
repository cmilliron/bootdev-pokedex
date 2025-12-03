import { State } from "./state";

export function commandDisplayPokedex(state: State): void {
    if (!state.pokedex) {
        console.log("Your pokedex is empty. Let's catch them all.");
    }
    const pokedexKeys = state.pokedex;
};
