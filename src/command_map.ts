import type { State } from "./state.js";

export async function commandMap(state: State) {
  try {
    const response = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;
    for (let location of response.results) {
      console.log(location.name);
    }
  } catch (error) {
    console.log("There was an error fetching your data. Try again later.");
  }
}
