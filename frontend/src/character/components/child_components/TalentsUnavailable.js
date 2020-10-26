import React from 'react';

export default function TalentsUnavailable(props) {
  let firstPass = true;

  return (
    <div>
      <div className='talentTop'>
        <h5>{props.talent}</h5>
        <span>
          <h6>Category</h6><p>{props.category.slice(0, 1).toUpperCase() + props.category.slice(1)}</p>
        </span>
        <span>
          <h6>Benefit</h6><p>{props.benefit}</p>
        </span>
      </div>
      <div>
        <hr />
      </div>
      <div className='talentReqs'>
        <h5>Requirements</h5>
        {props.requirements.map((e, index) => (
          <div key={e.id + e.requirement + index}>
            {e.option === 1 && firstPass ? <h4>Any one of the following:</h4> : null}
            <span>
              <h6>Requirement</h6><p>{e.requirement}</p>
            </span>
            <span className='typeScore'>
              <span>
                <h6>Type</h6><p>{e.requirement_type}</p>
              </span>
              {e.requirement_type === 'talent' ? null :
                <span>
                  <h6>Score</h6><p>{e.score}</p>
                </span>
              }
            </span>
            <hr />
            {firstPass = false}
          </div>
        ))}
      </div>
    </div>
  )
}