import { stdin, stdout } from "process";
import { createInterface } from "readline";

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
      console.log(`Your command was: ${cleanedInput[0]}`);
    }
    rl.prompt();
  }).on("close", () => {
    console.log("Pokedex closing down....");
    process.exit();
  });
}
