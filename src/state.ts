// import { CLICommand } from "./types/clicommand.type";
import { createInterface, type Interface } from "readline";
// import { getCommands } from "./getcommands.js";
import { cleanInput } from "./helper/clean_input.js";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";

export type CLICommand = {
  name: string;
  description: string;
  //   callback: (commands: Record<string, CLICommand>) => void;
  callback: (state: State) => void;
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
  // can add more commands here
};

export function getCommands(): Record<string, CLICommand> {
  return commands;
}

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  const state = {
    rl: rl,
    commands: getCommands(),
  };
  return state;
}
