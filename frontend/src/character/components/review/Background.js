import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Background() {
  const { info } = useContext(CharacterContext);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>BACKGROUND ABILITY</h3>
      </div>
      {
        Object.keys(info).length > 0 ?
          <div id="background">
            <h5>{info.background.background} - {info.background.ability}</h5>
            <div key={info.background.id + 'background'}>
              <p>{info.background.ability_description}</p>
            </div>
          </div>
          : null
      }
    </>
  );
}