const manaSymbolsMap: { [key: string]: string } = {
    'W': '/images/manasymbols/Hvid-01.png',
    'U': '/images/manasymbols/Bla-01.png',
    'B': '/images/manasymbols/Sort-01.png',
    'R': '/images/manasymbols/Rd-01.png',
    'G': '/images/manasymbols/Grn-01.png',
    '':  '/images/manasymbols/Neutral-01.png',
    'C': '/images/manasymbols/Neutral-01.png',
  };
  
  export const getManaSymbolUrl = (symbol: string): string => {
    return manaSymbolsMap[symbol] || '';
  };

const manaSymbolsColorCodeMap = {
    'W': '#f9f8db',
    'U': '#bcdaec',
    'B': '#c2b6ae',
    'R': '#f8a076',
    'G': '#9cc597',
    'C': '#e5e7eb',
  };
  
  export const getManaSymbolColorCode = (symbol: string): string => {
    return manaSymbolsColorCodeMap[symbol] || '';
  };