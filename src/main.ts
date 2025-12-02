import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const programState = initState(1000 * 60 * 6);
  startREPL(programState);
}

main();
