export const cleanCardInputs = (input: string) => {
  return input.split('\n').map(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return null; 
    const [quantity, ...cardNameParts] = trimmedLine.split(' ');
    const cardName = cardNameParts.join(' ');
    const count = parseInt(quantity, 10);
    if (isNaN(count) || !cardName) return null; 
    return { name: cardName, count };
  }).filter(card => card !== null); 
};