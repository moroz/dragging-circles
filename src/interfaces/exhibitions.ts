import { Artwork } from "./artwork";
import { ID } from "./common";

export interface Exhibition {
  id: ID;
  title: string;
  artworks: Artwork[];
}
