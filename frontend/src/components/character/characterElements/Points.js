import React, { useState, useEffect, useCallback } from 'react';

export default function Points(props) {
  const [points, setPoints] = useState(0);

  const setNewPoints = useCallback(() => {
    setPoints(props.initial - props.spentPoints.adjustment)
  }, [points, props]);

  useEffect(() => {
    setNewPoints();
  }, [setNewPoints, props]);

  return (
    <div id="points">
      <h3>Points to Spend: </h3>
      {
        !!points ? <h5>{points}</h5> : null
      }
    </div>
  );
}