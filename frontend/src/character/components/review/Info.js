import React, { useContext } from 'react';

import { AuthContext } from '../../../utils/context/AuthContext';
import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Info() {
  const { info } = useContext(CharacterContext);
  const { name } = useContext(AuthContext);

  return (
    <div id="review-info">
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>CHARACTER INFORMATION</h3>
      </div>
      <div className="side-by-side">
        {Object.keys(info).length > 0 ?
          <>
            <div>
              <p><b>CHARACTER NAME:</b> {`${info.characterName}`}</p>
              <p><b>RELIGION:</b> {`${info.religion.religion}`}</p>
              <p><b>DESCRIPTION:</b> {`${info.description}`}</p>
              <p><b>CATALYST:</b> {`${info.catalyst}`}</p>
              <p><b>BACKGROUND:</b> {`${info.background.background}`}</p>
              <p><b>SIN (VICE):</b> {`${info.sinVice.sin_vice}`}</p>
              <p><b>HERO POINTS:</b> {`${info.heroPoints}`}</p>
            </div>

            <div>
              <p><b>PLAYER NAME:</b> {!!name ? `${name[0].toUpperCase() + name.slice(1)}` : null}</p>
              <p><b>NATIONALITY:</b> {`${info.nationality}`}</p>
              <div className="side-by-side">
                <p><b>HEIGHT:</b> {`${info.heightFeet}'${info.heightInches}"`}</p>
                <p><b>WEIGHT:</b> {`${info.weight}`}</p>
                <p><b>EYES:</b> {`${info.eyes}`}</p>
                <p><b>HAIR:</b> {`${info.hair}`}</p>
              </div>
              <p><b>ORDER:</b> {`${info.order.order}`}</p>
              <p><b>VIRTUE:</b> {`${info.virtue.virtue}`}</p>
              <p><b>TRUE FAITH:</b> {`${info.trueFaith}`}</p>
              <p><b>DAMNATION:</b> {`${info.damnation}`}</p>
            </div>
          </>
          : null
        }
      </div>
    </div>
  );
}