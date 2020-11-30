import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function DicePools() {
  const { abilityScore } = useContext(CharacterContext);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>COMBAT DICE POOLS</h3>
      </div>

      <div id="pools" className="side-by-side">
        <div>
          <div>
            <div className="side-by-side">
              <h4>INITIATIVE</h4>
              <div className="in-ellipse">
                <svg height="24">
                  <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
                </svg>
                <p>{abilityScore.agility.score}</p>
              </div>
            </div>
            <p>Reflex (Agility)</p>
          </div>
          <div className="side-by-side">
            <h4>DEFENSE</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{Math.ceil((abilityScore.agility.score + abilityScore.toughness.score) / 2)}</p>
            </div>
          </div>
          <p>Average Agility + Toughness</p>
          <p>(round up)</p>
        </div>

        <div>
          <h5>COMBAT SKILL REFERENCE</h5>
          <div className="side-by-side">
            <div>
              <p><b>Skill</b></p>
              <h6>ARCHERY (AGI)</h6>
              <h6>FIREARMS (AGI)</h6>
              <h6>GRAPPLE (STR)</h6>
              <h6>HAND-TO-HAND (STR)</h6>
              <h6>HAND-TO-HAND (AGI)</h6>
              <h6>THROW (AGI)</h6>
            </div>
            <div>
              <p><b>Total Dice</b></p>
              <h6>9</h6>
              <h6>9</h6>
              <h6>9</h6>
              <h6>9</h6>
              <h6>9</h6>
              <h6>9</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}