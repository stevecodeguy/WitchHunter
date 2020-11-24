import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Abilities() {
  const { abilityScore } = useContext(CharacterContext);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>ABILITY SCORES</h3>
      </div>

      <div className="col3">
        {/* Physical Abilities -- start */}
        <div>
          <h4>PHYSICAL ABILITIES</h4>
          <div className="side-by-side">
            <h4>STRENGTH</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.strength.score}</p>
            </div>
          </div>
          <div className="side-by-side">
            <h4>AGILITY</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.agility.score}</p>
            </div>
          </div>
          <div className="side-by-side">
            <h4>TOUGHNESS</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.toughness.score}</p>
            </div>
          </div>
        </div>
        {/* Physical Abilities -- end */}

        {/* Mental Abilities -- start */}
        <div>
          <h4>MENTAL ABILITIES</h4>
          <div className="side-by-side">
            <h4>EDUCATION</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.education.score}</p>
            </div>
          </div>
          <div className="side-by-side">
            <h4>REASON</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.reason.score}</p>
            </div>
          </div>
          <div className="side-by-side">
            <h4>WILL</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.will.score}</p>
            </div>
          </div>
        </div>
        {/* Mental Abilities -- end */}

        {/* Spiritual Abilities -- start */}
        <div>
          <h4>SPIRITUAL ABILITIES</h4>
          <div className="side-by-side">
            <h4>COURAGE</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.courage.score}</p>
            </div>
          </div>
          <div className="side-by-side">
            <h4>INTUITION</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.intuition.score}</p>
            </div>
          </div>
          <div className="side-by-side">
            <h4>PERSONALITY</h4>
            <div className="in-ellipse">
              <svg height="24">
                <ellipse cx="22" cy="12" rx="22" ry="12"></ellipse>
              </svg>
              <p>{abilityScore.personality.score}</p>
            </div>
          </div>
        </div>
        {/* Spiritual Abilities -- end */}
      </div>
    </>
  );
}