import { EditorState } from "draft-js";
import React, { MouseEvent } from "react";
import { INLINE_STYLES } from "./constants";
import ToolbarButton from "../ToolbarButton";
import styles from "../Editor.module.sass";

interface Props {
  editorState: EditorState;
  onToggle: (style: string) => (e: MouseEvent<HTMLButtonElement>) => void;
}

const InlineStyles: React.FC<Props> = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className={styles.controls}>
      {INLINE_STYLES.map(({ label, style, icon }) => (
        <ToolbarButton
          key={style}
          label={label}
          icon={icon}
          onToggle={onToggle(style)}
          active={currentStyle.has(style)}
        />
      ))}
    </div>
  );
};

export default InlineStyles;
