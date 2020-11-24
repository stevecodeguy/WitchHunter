import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Abilities() {
  const { skills } = useContext(CharacterContext);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>SKILLS</h3>
      </div>
      <div className="side-by-side">

        <h3>SKILLS</h3>
        <h3>SKILLS</h3>
      </div>
    </>
  );
}