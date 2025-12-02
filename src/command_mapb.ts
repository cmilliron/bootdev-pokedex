import type { State } from "./state.js";

export async function commandMapB(state: State) {
  try {
    const response = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;
    for (let location of response.results) {
      console.log(location.name);
    }
  } catch (error) {
    console.log(`${error}`);
  }
}
