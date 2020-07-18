import React from 'react';

export default function Points(props) {
  return (
    <div id="points">
      <h3>Points to Spend: </h3>
      { 
      <h5>{props.initial - props.spentPoints}</h5> }
    </div>
  );
}