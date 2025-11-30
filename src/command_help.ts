import type { State } from "./state.js";

export async function commandHelp(state: State) {
  const commands = state.commands;
  console.log("Welcome to the Pokedex!\nUsage:\n");
  console.log(commands);
  for (let key in commands) {
    console.log(`${key}: ${commands[key].description}`);
  }
}
