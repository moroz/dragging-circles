import React, { useCallback, MouseEvent, useEffect } from "react";
import styles from "./Toolbar.module.sass";
import { EditorState, RichUtils } from "draft-js";
import BlockStyles from "../BlockStyles";
import InlineStyles from "../InlineStyles";
import { formatDateTime } from "../../../helpers/dateHelpers";
import SaveButton from "../SaveButton";

interface Props {
  onSave: VoidFunction;
  saveDisabled: boolean;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  lastSaved: Date | null;
  error: boolean;
  dirty: boolean;
}

function StatusMessage({ error, lastSaved, dirty }: Partial<Props>) {
  if (error) {
    return (
      <p className={styles.status}>儲存時出錯。您的改變可能未儲存成功。</p>
    );
  }
  if (dirty) return <p className={styles.status}>有未儲存的更改</p>;
  if (lastSaved) {
    return (
      <p className={styles.status}>最後儲存時間：{formatDateTime(lastSaved)}</p>
    );
  }
  return null;
}

const Toolbar: React.FC<Props> = ({
  onSave,
  saveDisabled,
  editorState,
  setEditorState,
  lastSaved,
  error,
  dirty
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isSaveKey =
        (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
        e.key === "s";
      if (!isSaveKey) return;
      e.preventDefault();
      if (saveDisabled) return;
      onSave();
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const onToggleInlineStyle = useCallback(
    (style: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setEditorState((oldState) => {
        return RichUtils.toggleInlineStyle(oldState, style);
      });
    },
    [setEditorState]
  );

  const onToggleBlockType = useCallback(
    (blockType: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setEditorState((oldState) => {
        return RichUtils.toggleBlockType(oldState, blockType);
      });
    },
    [setEditorState]
  );

  return (
    <div className={styles.toolbar}>
      <SaveButton onSave={onSave} disabled={saveDisabled} />
      <InlineStyles editorState={editorState} onToggle={onToggleInlineStyle} />
      <BlockStyles editorState={editorState} onToggle={onToggleBlockType} />
      <StatusMessage lastSaved={lastSaved} error={error} dirty={dirty} />
    </div>
  );
};

export default Toolbar;
