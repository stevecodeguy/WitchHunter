import React, { useContext, useEffect, useState } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Health() {
  const { inventory, abilityScore } = useContext(CharacterContext);

  useEffect(() => {
  

  }, [inventory]);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>HEALTH TRACK</h3>
      </div>
      <div className="side-by-side shots">
        <h5>HEALTHY </h5>
        <p>{`Toughness x 2 ${abilityScore["toughness"].score}`}</p>
        <div className='squares'>
          {/* {
            arrows.map(arrow => (
              arrow === 1 ? <div className='square filled'></div> : <div className='square'></div>
            ))
          } */}
        </div>
      </div>
    </>
  );
}