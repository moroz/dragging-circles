import { Artwork } from "./artwork";
import { ID } from "./common";

export interface Exhibition {
  id: ID;
  title: string;
  titlePosition?: number | null;
  active: boolean;
  artworks: Artwork[];
  background: string | null;
  showTitle: boolean;
  borderColor: string | null;
  fontColor: string | null;
}
