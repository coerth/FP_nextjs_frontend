export interface FetchCardsParams {
    limit?: number;
    skip?: number;
    lang?: string;
    color?: string;
    name?: string;
    type?: string;
    legalities?: { [key: string]: string };
    setId?: string;
  }