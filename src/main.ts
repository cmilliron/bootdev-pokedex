import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const testTime = 10000;
  const productionTime = 1000 * 60 * 6
  const programState = initState(productionTime);
  startREPL(programState);
}

main();
