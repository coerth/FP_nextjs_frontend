export interface MtGCard {
    id: string;
    artist: string;
    cmc: number;
    scryfall_set_uri: string;
    image_uris: {
        border_crop: string;
        art_crop: string;
    };
    legalities: {
        standard: string;
        future: string;
        historic: string;
        gladiator: string;
        pioneer: string;
        explorer: string;
        modern: string;
        legacy: string;
        pauper: string;
        vintage: string;
        penny: string;
        commander: string;
        brawl: string;
        historicbrawl: string;
        alchemy: string;
        paupercommander: string;
        duel: string;
        oldschool: string;
        premodern: string;
    };
    mc: string;
    name: string;
    set_name: string;
    mtgo_id: number;
    lang: string;
    color_identity: string[];
    colors: string[];
    type_line: string;
  }