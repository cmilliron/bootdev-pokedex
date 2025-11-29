// import { stdin, stdout } from "process";
// import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { cleanInput } from "./helper/clean_input.js";
import { initState } from "./state.js";

export function startREPL() {
  const programState = initState();
  programState.rl.prompt();
  programState.rl
    .on("line", (input) => {
      const cleanedInput = cleanInput(input);
      if (cleanedInput.length > 0 && cleanedInput) {
        const command = cleanedInput[0];
        switch (command) {
          case "help":
            programState.commands.help.callback(programState);
            break;
          case "exit":
            programState.commands.exit.callback(programState);
            break;
          default:
            console.log(`Unknown command`);
        }
      }
      programState.rl.prompt();
    })
    .on("close", () => {
      // programState.commands.exit.callback(programState);
    });
}
