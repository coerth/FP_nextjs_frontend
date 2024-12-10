export interface MtgSet {
  set_id: string;
  name: string;
  set_type: string;
  released_at: string;
  block_code: string;
  block: string;
  parent_set_code: string;
  card_count: number;
  digital: boolean;
  foil_only: boolean;
  scryfall_set_uri: string;
  set_uri: string;
  icon_svg_uri: string;
  set_search_uri: string;
}
