import React from 'react';

export default function TalentsUnavailable(props) {
  return (
    <>
      <h5>{props.talent}</h5>
      <h6>Category</h6><p>{props.category.slice(0, 1).toUpperCase() + props.category.slice(1)}</p>
      <h6>Benefit</h6><p>{props.benefit}</p>
      {props.requirements.map((e, index) => (
        <div key={e.id + e.requirement + index}>
          <h6>Requirements</h6><p>{e.requirement}</p>
          <h6>Type</h6><p>{e.requirement_type}</p>
          <h6>Score</h6><p>{e.score}</p>
        </div>
      ))}
    </>
  )
}