import React, { useState } from 'react';

export default function TransferElectives(props) {
  const [transferTo, setTransferTo] = useState(null);

  const transferChange = (event) => {
    event.preventDefault();
    const transferCat = event.target.value;
    setTransferTo(transferCat.charAt(0).toUpperCase() + transferCat.slice(1));
  }

  const sendSkills = (event) => {
    event.preventDefault();
    console.log(transferTo, props.category);
    props.transferSkills(transferTo, props.category);
  }

  return (
    <div>
      {
        !!props.electives && props.electives > 1 ? (
          <>
            <label htmlFor="move">Transfer to: </label>
            <select name="move" id="move_elective" defaultValue="choose" onChange={(event) => transferChange(event)}>
              <option value="choose">(choose section)</option>
              {props.category === 'Fighting' ? null : <option value="fighting">Fighting Skills</option>}
              {props.category === 'Interaction' ? null : <option value="interaction">Interaction Skills</option>}
              {props.category === 'Movement' ? null : <option value="movement">Movement Skills</option>}
              {props.category === 'Professional' ? null : <option value="professional">Professional Skills</option>}
              {props.category === 'Reaction' ? null : <option value="reaction">Reaction Skills</option>}
            </select>
            <p> (2/1 cost) </p>
            <button onClick={(event) => sendSkills(event)}>Transfer</button>
          </>
        ) : null
      }
      {
        !!props.transferredFrom ?
          Object.entries(props.transferredFrom).map(([key, value]) => (
            <div key={key}>
              <p>{`${value} elective${value > 1 ? `s` : ``} transferred from ${key}`}</p>
              <button onClick={(event) => sendSkills(event)}>Return to {key}</button>
            </div>
          )) : null
      }
    </div >
  );
}