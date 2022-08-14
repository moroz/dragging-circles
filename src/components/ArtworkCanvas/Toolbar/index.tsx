import React from "react";
import useDraggableCanvas from "../../../hooks/useDraggableCanvas";
import { useCanvasReducerContext } from "../../../store/CanvasReducerContext";
import { CanvasReducerMode } from "../../../store/CanvasReducerState";
import styles from "./Toolbar.module.sass";

interface Props {
  onReset: () => void;
}

const Toolbar: React.FC<Props> = ({ onReset }) => {
  const { state, startDragging, toggleCreating } = useCanvasReducerContext();

  const { saveLayout } = useDraggableCanvas();

  const canDrag = state.mode === CanvasReducerMode.Standby;

  return (
    <div className={styles.toolbar}>
      {canDrag ? (
        <button
          type="button"
          onClick={startDragging}
          disabled={!canDrag}
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
      <button
        type="button"
        onClick={toggleCreating}
        disabled={state.dirty}
        className="button is-success"
      >
        {state.mode === CanvasReducerMode.Creating ? "取消新增" : "新增藝品"}
      </button>
    </div>
  );
};

export default Toolbar;
