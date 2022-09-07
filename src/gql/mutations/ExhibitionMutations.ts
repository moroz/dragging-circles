import { gql, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import {
  Artwork,
  ArtworkInput,
  ArtworkShapeInput
} from "../../interfaces/artwork";
import { ID, MutationResult } from "../../interfaces/common";
import { Exhibition } from "../../interfaces/exhibitions";
import { GRAPHQL_API_URI } from "../client";

export const SAVE_ARTWORK_LAYOUT_MUTATION = gql`
  mutation SaveLayout($exhibitionId: ID!, $shapes: [ArtworkShapeInput!]!) {
    result: saveArtworkLayout(exhibitionId: $exhibitionId, shapes: $shapes) {
      success
      data {
        id
        artworks {
          id
          x
          y
        }
      }
      errors {
        message
        key
      }
    }
  }
`;

export interface SaveArtworkLayoutMutationResult {
  result: MutationResult<Exhibition>;
}

export interface SaveArtworkLayoutMutationVariables {
  exhibitionId: ID;
  shapes: ArtworkShapeInput[];
}

export const useSaveArtworkLayoutMutation = () =>
  useMutation<
    SaveArtworkLayoutMutationResult,
    SaveArtworkLayoutMutationVariables
  >(SAVE_ARTWORK_LAYOUT_MUTATION);

export const CREATE_ARTWORK_MUTATION = gql`
  mutation CreateArtwork($params: ArtworkInput!) {
    result: createArtwork(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
        artworks {
          id
          x
          y
        }
      }
    }
  }
`;

export interface CreateArtworkMutationResult {
  result: MutationResult<Artwork>;
}

export interface CreateArtworkMutationVariables {
  params: ArtworkInput;
}

export const useCreateArtworkMutation = () =>
  useMutation<CreateArtworkMutationResult, CreateArtworkMutationVariables>(
    CREATE_ARTWORK_MUTATION
  );

export const UPDATE_EXHIBITION_MUTATION = gql`
  mutation UpdateExhibition($params: UpdateExhibitionParams!) {
    result: updateExhibition(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
        title
        showTitle
        background
      }
    }
  }
`;

export interface UpdateExhibitionParams {
  title: string;
  showTitle: boolean;
  background?: File;
}

export interface UpdateExhibitionMutationResult {
  result: MutationResult<Exhibition>;
}

export const updateExhibitionMutation = ({
  title,
  background,
  showTitle
}: UpdateExhibitionParams): Promise<{
  data: UpdateExhibitionMutationResult;
}> => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("query", UPDATE_EXHIBITION_MUTATION.loc!.source.body);
    data.append(
      "variables",
      JSON.stringify({
        params: { title, showTitle, background: background && "image" }
      })
    );
    if (background) {
      data.append("image", background);
    }
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", GRAPHQL_API_URI, true);
    xhr.addEventListener("load", () => {
      resolve(JSON.parse(xhr.response));
    });
    xhr.addEventListener("error", reject);
    xhr.send(data);
  });
};

export const useUpdateExhibitionMutation = () => {
  const [mutating, setMutating] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const mutate = useCallback(async (params: UpdateExhibitionParams) => {
    try {
      setSuccess(false);
      setCalled(true);
      setMutating(true);
      const res = await updateExhibitionMutation(params);
      setMutating(false);
      setSuccess(true);
      return res;
    } catch (e) {
      setMutating(false);
      setError(e);
    }
  }, []);

  return { mutate, mutating, error, called, success };
};

export const CREATE_EXHIBITION_MUTATION = gql`
  mutation CreateExhibition($params: CreateExhibitionParams!) {
    result: createExhibition(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
        active
        title
      }
    }
  }
`;

export interface CreateExhibitionMutationResult {
  result: MutationResult<Exhibition>;
}

export interface CreateExhibitionParams {
  title: string;
}

export interface CreateExhibitionMutationVariables {
  params: CreateExhibitionParams;
}

export const useCreateExhibitionMutation = () =>
  useMutation<
    CreateExhibitionMutationResult,
    CreateExhibitionMutationVariables
  >(CREATE_EXHIBITION_MUTATION);

export const SET_ACTIVE_EXHIBITION_MUTATION = gql`
  mutation SetActiveExhibition($id: ID!) {
    result: setActiveExhibition(id: $id) {
      success
      errors {
        key
        message
      }
      data {
        id
        title
        active
      }
    }
  }
`;

export interface SetActiveExhibitionMutationResult {
  result: MutationResult<Exhibition>;
}

export interface SetActiveExhibitionMutationVariables {
  id: ID;
}

export const useSetActiveExhibitionMutation = () =>
  useMutation<
    SetActiveExhibitionMutationResult,
    SetActiveExhibitionMutationVariables
  >(SET_ACTIVE_EXHIBITION_MUTATION);
