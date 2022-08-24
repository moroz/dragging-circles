import { gql, useMutation } from "@apollo/client";
import { Artwork } from "../../interfaces/artwork";
import { ID, MutationResult } from "../../interfaces/common";
import {
  ArtworkAsset,
  ArtworkAssetParams,
  AssetType
} from "../../interfaces/assets";
import { GRAPHQL_API_URI } from "../client";

export const UPLOAD_ARTWORK_IMAGE = gql`
  mutation CreateAsset($file: Upload!, $artworkId: ID!, $type: AssetType!) {
    result: createAsset(file: $file, artworkId: $artworkId, type: $type) {
      success
      errors {
        key
        message
      }
      data {
        id
        asset {
          ... on Image {
            id
            uuid
          }
        }
      }
    }
  }
`;

export interface UploadArtworkImageVariables {
  artworkId: ID;
  file: File;
  type: AssetType;
}

export interface UploadArtworkImageResult {
  data: {
    result: MutationResult<ArtworkAsset>;
  };
}

export const uploadArtworkImage = (
  { file, artworkId, type }: UploadArtworkImageVariables,
  onProgress: (progress: number) => void
): Promise<UploadArtworkImageResult> => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("query", UPLOAD_ARTWORK_IMAGE.loc!.source.body);
    data.append("variables", JSON.stringify({ artworkId, file: "file", type }));
    data.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", GRAPHQL_API_URI, true);
    xhr.upload.addEventListener("progress", (ev) => {
      if (ev.lengthComputable) {
        onProgress((ev.loaded / ev.total) * 100);
      }
    });
    xhr.addEventListener("load", () => {
      resolve(JSON.parse(xhr.response));
    });
    xhr.addEventListener("error", reject);
    xhr.send(data);
  });
};

export const REARRANGE_ARTWORK_IMAGES = gql`
  mutation RearrangeImages($artworkId: ID!, $params: [ArtworkAssetParams!]!) {
    result: rearrangeArtworkAssets(artworkId: $artworkId, params: $params) {
      success
      data {
        id
        artworkAssets {
          id
          priority
          asset {
            id
          }
        }
      }
    }
  }
`;

export interface RearrangeArtworkAssetsMutationResult {
  result: MutationResult<Artwork>;
}

export interface RearrangeArtworkAssetsMutationVariables {
  artworkId: ID;
  params: ArtworkAssetParams[];
}

export const useRearrangeArtworkAssetsMutation = () =>
  useMutation<
    RearrangeArtworkAssetsMutationResult,
    RearrangeArtworkAssetsMutationVariables
  >(REARRANGE_ARTWORK_IMAGES);

export const DELETE_ARTWORK_IMAGE = gql`
  mutation DeleteArtworkAsset($artworkId: ID!, $artworkAssetId: ID!) {
    result: deleteArtworkAsset(
      artworkId: $artworkId
      artworkAssetId: $artworkAssetId
    ) {
      success
    }
  }
`;

export interface DeleteArtworkAssetMutationResult {
  result: MutationResult<ArtworkAsset>;
}

export interface DeleteArtworkAssetMutationVariables {
  artworkId: ID;
  artworkAssetId: ID;
}

export const useDeleteArtworkAssetMutation = () =>
  useMutation<
    DeleteArtworkAssetMutationResult,
    DeleteArtworkAssetMutationVariables
  >(DELETE_ARTWORK_IMAGE);

export const ADD_ARTWORK_VIDEO = gql`
  mutation AddArtworkVideo($artworkId: ID!, $videoId: String!) {
    addArtworkVideo(artworkId: $artworkId, videoId: $videoId) {
      success
      errors
      data {
        id
        asset {
          ... on Video {
            id
            videoId
          }
        }
      }
    }
  }
`;

export interface AddArtworkVideoMutationResult {
  addArtworkVideo: MutationResult<ArtworkAsset>;
}

export interface AddArtworkVideoMutationVariables {
  artworkId: ID;
  videoId: string;
}

export const useAddArtworkVideoMutation = () =>
  useMutation<AddArtworkVideoMutationResult, AddArtworkVideoMutationVariables>(
    ADD_ARTWORK_VIDEO
  );
