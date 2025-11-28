import { CLICommand } from "./types/clicommand.type";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export const commands = {
  exit: {
    name: "exit",
    description: "Exits the pokedex",
    callback: commandExit,
  },
  help: {
    name: "help",
    description: "command line help",
    callback: commandHelp,
  },
  // can add more commands here
};

export function getCommands(): Record<string, CLICommand> {
  return commands;
}
