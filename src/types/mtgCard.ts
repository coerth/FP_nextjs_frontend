export interface MtGCard {
    id: string;
    artist: string;
    cmc: number;
    scryfall_set_uri: string;
    image_uris: {
        border_crop: string;
        art_crop: string;
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