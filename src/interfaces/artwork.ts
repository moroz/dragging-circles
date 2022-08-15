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

export interface ArtworkShapeInput {
  id: ID;
  x: number;
  y: number;
}

export interface ArtworkInput {
  author?: string;
  body?: string;
  bodyHtml?: string;
  title?: string;
  x: number;
  y: number;
  exhibitionId: ID;
}

export interface UpdateArtworkInput {
  author?: string;
  body?: string;
  bodyHtml?: string;
  title?: string;
}
