// import { CLICommand } from "./types/clicommand.type";
// import { getCommands } from "./getcommands.js";
// import { cleanInput } from "./helper/clean_input.js";
import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { PokeAPI } from "./pokeAPI.js";

export type CLICommand = {
  name: string;
  description: string;
  //   callback: (commands: Record<string, CLICommand>) => void;
  callback: (state: State) => Promise<void>;
};

export const commands = {
  exit: {
    name: "exit",
    description: "Exits the pokedex",
    callback: commandExit,
  },
  help: {
    name: "help",
    description: "Command line help",
    callback: commandHelp,
  },
  map: {
    name: "map",
    description: "List the next 20 location areas in teh Pokemon world",
    callback: commandMap,
  },
  mapb: {
    name: "mapb",
    description: "List the previous 20 location areas in teh Pokemon world",
    callback: commandMapB,
  },
  // can add more commands here
};

export function getCommands(): Record<string, CLICommand> {
  return commands;
}

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  const pokeAPI = new PokeAPI();
  const state = {
    rl: rl,
    commands: getCommands(),
    pokeAPI: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
  return state;
}
