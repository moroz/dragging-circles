import { ImageOrientation } from "../interfaces/assets";

export const ORIENTATION_RATIO_MAPPING: Record<ImageOrientation, number> = {
  [ImageOrientation.Portrait]: 3 / 4,
  [ImageOrientation.Landscape]: 16 / 9,
  [ImageOrientation.KeepProportions]: 1
};
