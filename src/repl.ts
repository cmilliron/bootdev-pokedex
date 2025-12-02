// import { stdin, stdout } from "process";
// import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { cleanInput } from "./helper/clean_input.js";
import { initState, State } from "./state.js";

export function startREPL(state: State) {
  state.rl.prompt();
  state.rl
    .on("line", async (input) => {
      const cleanedInput = cleanInput(input);
      if (cleanedInput.length > 0 && cleanedInput) {
        const [command, ...args ] = cleanedInput;
        try {
          await state.commands[command].callback(state, ...args);
        } catch (error) {
          console.log("unkonw command");
        }
        // switch (command) {
        //   case "help":
        //     state.commands.help.callback(state);
        //     break;
        //   case "exit":
        //     state.commands.exit.callback(state);
        //     break;
        //   default:
        //     console.log(`Unknown command`);
        // }
      }
      state.rl.prompt();
    })
    .on("close", () => {
      // state.commands.exit.callback(state);
    });
}
