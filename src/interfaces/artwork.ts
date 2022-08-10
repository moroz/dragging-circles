import { ID } from "./common";

export interface Artwork {
  id: ID;
  x: number;
  y: number;
  body: string;
  author: string;
  title: string;
  insertedAt: string;
  updatedAt: string;
}
