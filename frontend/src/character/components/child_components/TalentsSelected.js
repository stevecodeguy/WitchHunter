import React from 'react';

export default function TalentsSelected(props) {
  return (
    <>
      <h5>{props.talent}</h5>
      <span>
        <h6>Category</h6><p>{props.category.slice(0, 1).toUpperCase() + props.category.slice(1)}</p>
      </span>
      <span>
        <h6>Benefit</h6><p>{props.benefit}</p>
      </span>
      <button
        onClick={() => {
          props.removeTalent(props.id);
        }}
      >Remove</button>
    </>
  )
}