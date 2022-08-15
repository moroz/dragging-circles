import React, { useCallback, useState } from "react";
import "draft-js/dist/Draft.css";
import {
  ContentBlock,
  convertFromRaw,
  convertToRaw,
  DraftEditorCommand,
  Editor,
  EditorState,
  RawDraftContentState,
  RichUtils
} from "draft-js";
import styles from "./Editor.module.sass";
import clsx from "clsx";
import Toolbar from "./Toolbar";

interface Props {
  initialState?: any;
  onSave: (state: RawDraftContentState) => Promise<boolean>;
  mutating: boolean;
}

function getBlockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const EditorComponent: React.FC<Props> = ({
  initialState,
  onSave,
  mutating
}) => {
  const [editorState, rawSetEditorState] = useState(() => {
    if (initialState) {
      return EditorState.createWithContent(convertFromRaw(initialState));
    } else {
      return EditorState.createEmpty();
    }
  });

  const setEditorState: typeof rawSetEditorState = useCallback(
    (state) => {
      rawSetEditorState(state);
      setDirty(true);
    },
    [rawSetEditorState]
  );

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState(false);
  const [dirty, setDirty] = useState(false);

  const handleKeyCommand = useCallback(
    (command: DraftEditorCommand, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }

      return "not-handled";
    },
    [setEditorState]
  );

  const handleSave = async () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const result = await onSave(raw);
    if (result) {
      setLastSaved(new Date());
      setError(false);
      setDirty(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.editor}>
      <Toolbar
        setEditorState={setEditorState}
        onSave={handleSave}
        saveDisabled={!dirty || mutating}
        editorState={editorState}
        error={error}
        lastSaved={lastSaved}
        dirty={dirty}
      />
      <div className={clsx(styles.editorContainer, "content")}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          blockStyleFn={getBlockStyle as any}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
