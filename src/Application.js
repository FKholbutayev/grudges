import React, { useContext } from 'react';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import { GrudgeContext } from './GrudgeContext';

const Application = () => {
  const { redo, undo, isPast, isFuture } = useContext(GrudgeContext);

  return (
    <div className="Application">
      <NewGrudge />
      <button disabled={!isPast} onClick={undo}>
        Undo
      </button>
      <button disabled={!isFuture} onClick={redo}>
        Redo
      </button>
      <Grudges />
    </div>
  );
};

export default Application;
