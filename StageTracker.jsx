/* eslint-disable react/no-array-index-key */
import React from 'react';

const getLights = stage => (
  new Array(5).fill(0).map((_, idx) => {
    const active = idx >= 5 - stage;
    return (
      <div
        key={idx}
        className={`light ${active ? 'on' : ''}`}
      />
    );
  })
);

const StageTracker = ({ stage }) => {
  const lights = getLights(stage);
  return (
    <div className="stage-tracker">
      {lights}
    </div>
  );
};

export default StageTracker;
