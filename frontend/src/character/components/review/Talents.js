import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Talents() {
  const { talents } = useContext(CharacterContext);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>TALENTS</h3>
      </div>
      <div id="talents">
        <div className="side-by-side title">
          <h5>TALENT</h5>
          <h5>DESCRIPTION</h5>
        </div>
        {
          talents.map(talent => (
            <div key="talent.id" className='side-by-side'>
              <h6>{talent.talent}</h6>
              <p>{talent.benefit}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}