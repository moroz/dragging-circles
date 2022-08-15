import React from "react";
import useDraggableCanvas from "../../../hooks/useDraggableCanvas";
import { useCanvasReducerContext } from "../../../store/CanvasReducerContext";
import { CanvasReducerMode } from "../../../store/CanvasReducerState";
import styles from "./Toolbar.module.sass";

interface Props {
  onReset: () => void;
}

const MODE_TO_MESSAGE: Record<CanvasReducerMode, string> = {
  [CanvasReducerMode.Standby]: `您可以點擊畫布上的任何一個圈圈進行編輯或刪除。`,
  [CanvasReducerMode.Moving]: `現在您可以用滑鼠拖曳圈圈（作品）。拖曳完畢請點擊「儲存佈局」。`,
  [CanvasReducerMode.Creating]: `請點擊畫面上的一處來建立作品。`,
  [CanvasReducerMode.Loading]: ""
};

const Toolbar: React.FC<Props> = ({ onReset }) => {
  const { state, startDragging, toggleCreating } = useCanvasReducerContext();

  const { saveLayout } = useDraggableCanvas();

  return (
    <div className={styles.toolbar}>
      {[CanvasReducerMode.Standby, CanvasReducerMode.Creating].includes(
        state.mode
      ) ? (
        <button
          type="button"
          onClick={startDragging}
          disabled={state.mode === CanvasReducerMode.Creating}
          className="button"
        >
          開啓拖拉
        </button>
      ) : null}
      {state.mode === CanvasReducerMode.Moving ? (
        <button type="button" onClick={onReset} className="button is-danger">
          捨棄更改
        </button>
      ) : null}
      {state.mode === CanvasReducerMode.Moving ? (
        <button
          type="button"
          onClick={saveLayout}
          disabled={!state.dirty}
          className="button is-success"
        >
          儲存佈局
        </button>
      ) : null}
      {state.mode !== CanvasReducerMode.Moving ? (
        <button
          type="button"
          onClick={toggleCreating}
          disabled={state.dirty}
          className="button is-success"
        >
          {state.mode === CanvasReducerMode.Creating ? "取消新增" : "新增藝品"}
        </button>
      ) : null}
      <div>{MODE_TO_MESSAGE[state.mode]}</div>
    </div>
  );
};

export default Toolbar;
