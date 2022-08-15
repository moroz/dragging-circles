import { ReactComponent as BoldIcon } from "./bold.svg";
import { ReactComponent as ItalicIcon } from "./italic.svg";
import { ReactComponent as UnderlineIcon } from "./underline.svg";

export const INLINE_STYLES = [
  {
    label: "粗體",
    style: "BOLD",
    icon: BoldIcon
  },
  {
    label: "斜體",
    style: "ITALIC",
    icon: ItalicIcon
  },
  {
    label: "底線",
    style: "UNDERLINE",
    icon: UnderlineIcon
  },
  {
    label: "等寬",
    style: "CODE"
  }
];
