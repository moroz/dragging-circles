import { ID } from "./common";

export enum AssetType {
  Image = "IMAGE",
  Video = "VIDEO",
  Audio = "AUDIO"
}

export interface Image {
  id: ID;
  __typename: "Image";
  downloadUrl: string;
  mime: string | null;
  originalFilename: string | null;
  altText: string | null;
  insertedAt: string;
  updatedAt: string;
}

export interface Video {
  id: ID;
  __typename: "Video";
  videoId: string;
  insertedAt: string;
  updatedAt: string;
}

export interface Audio {
  id: ID;
  __typename: "Audio";
  downloadUrl: string;
  insertedAt: string;
  updatedAt: string;
}

export type Asset = Image | Video | Audio;

export interface ArtworkAsset {
  id: ID;
  position: number;
  asset: Asset;
}

export interface ArtworkAssetParams {
  position: number;
  assetId: ID;
}
