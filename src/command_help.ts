import { getCommands } from "./getcommands.js";

export function commandHelp() {
  const commands = getCommands();
  console.log("Welcome to the Pokedex!\nUsage:\n");
  for (let key in commands) {
    console.log(`${key}: ${commands["key"]}`);
  }
}
