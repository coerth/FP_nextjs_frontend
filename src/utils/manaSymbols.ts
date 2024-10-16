const manaSymbolsMap: { [key: string]: string } = {
    'W': '/images/manasymbols/Hvid-01.png',
    'U': '/images/manasymbols/Bla-01.png',
    'B': '/images/manasymbols/Sort-01.png',
    'R': '/images/manasymbols/Rd-01.png',
    'G': '/images/manasymbols/Grn-01.png',
    // Add other mana symbols as needed
  };
  
  export const getManaSymbolUrl = (symbol: string): string => {
    return manaSymbolsMap[symbol] || '';
  };