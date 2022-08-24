import React from "react";
import { youtubeThumbnailUrl } from "../../helpers/youtubeHelpers";
import { Asset } from "../../interfaces/assets";

interface Props {
  asset: Asset;
  className?: string;
}

const AssetImage: React.FC<Props> = ({ asset, className }) => {
  switch (asset.__typename) {
    case "Image":
      return (
        <img
          src={asset.downloadUrl}
          alt={asset.altText ?? ""}
          className={className}
        />
      );
    case "Video":
      return (
        <img
          src={youtubeThumbnailUrl(asset.videoId, "mqdefault")}
          className={className}
        />
      );
  }
};

export default AssetImage;
