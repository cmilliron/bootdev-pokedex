export function cleanInput(input: string): string[] {
  const items = input.toLowerCase().trim().split(" ");
  const outputList = items.filter((i) => i.length > 0);
  return outputList;
}

export function startREPL() {}
