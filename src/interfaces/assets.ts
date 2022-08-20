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

export type Asset = Image | Video;

export interface ArticleAsset {
  id: ID;
  priority: number;
  asset: Asset;
}

export interface ArticleAssetParams {
  priority: number;
  assetId: ID;
}
