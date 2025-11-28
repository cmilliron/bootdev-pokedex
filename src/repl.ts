import { stdin, stdout } from "process";
import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function cleanInput(input: string): string[] {
  const items = input.toLowerCase().trim().split(" ");
  const outputList = items.filter((i) => i.length > 0);
  return outputList;
}

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();
  rl.on("line", (input) => {
    const cleanedInput = cleanInput(input);
    if (cleanedInput.length > 0 && cleanedInput) {
      const command = cleanedInput[0];
      switch (command) {
        case "help":
          commandHelp();
          break;
        case "exit":
          commandExit();
          break;
        default:
          console.log(`Unknown command`);
      }
    }
    rl.prompt();
  }).on("close", () => {
    commandExit();
  });
}
