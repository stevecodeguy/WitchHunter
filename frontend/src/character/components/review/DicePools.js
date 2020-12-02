import React, { useContext, useState, useEffect } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function DicePools() {
  const { abilityScore, skills } = useContext(CharacterContext);
  const [skillSnapShot, setSkillSnapShot] = useState({});

  useEffect(() => {
    setSkillSnapShot(() => {
      let snapShot = {};
      skills.forEach(skill => {
        switch (skill.skill) {
          case 'Archery':
            snapShot = { ...snapShot, 'Archery': { score: skill.score + abilityScore.agility.score } };
            break;
          case 'Firearms':
            snapShot = { ...snapShot, 'Firearms': { score: skill.score + abilityScore.agility.score } };
            break;
          case 'Grapple':
            snapShot = { ...snapShot, 'Grapple': { score: skill.score + abilityScore.strength.score } };
            break;
          case 'Hand-to-Hand':
            snapShot = { ...snapShot, 'Hand-to-Hand': { score: skill.score + abilityScore.strength.score } };
            break;
          case 'Hand-to-Hand (Small Weapons)':
            snapShot = { ...snapShot, 'Hand-to-Hand (Small Weapons)': { score: skill.score + abilityScore.agility.score } };
            break;
          case 'Throw':
            snapShot = { ...snapShot, 'Throw': { score: skill.score + abilityScore.agility.score } };
            break;
          default:
            break;
        }
      });

      return snapShot;
    });
  }, [skills, abilityScore])

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
          <div className="side-by-side dice-pools">
            <div>
              <p><b>Skill</b></p>
              <p><b>ARCHERY (AGI)</b></p>
              <p><b>FIREARMS (AGI)</b></p>
              <p><b>GRAPPLE (STR)</b></p>
              <p><b>HAND-TO-HAND (STR)</b></p>
              <p><b>HAND-TO-HAND (AGI)</b></p>
              <p><b>THROW (AGI)</b></p>
            </div>
            <div>
              <p><b>Total Dice</b></p>
              {
                !!skillSnapShot ?
                  <>
                    <p key="archery"><b>{skillSnapShot.Archery.score}</b></p>
                    <p key="firearms"><b>{skillSnapShot.Firearms.score}</b></p>
                    <p key="grapple"><b>{skillSnapShot.Grapple.score}</b></p>
                    <p key="handtohand"><b>{skillSnapShot["Hand-to-Hand"].score}</b></p>
                    <p key="handtohandagi"><b>{skillSnapShot["Hand-to-Hand (Small Weapons)"].score}</b></p>
                    <p key="throw"><b>{skillSnapShot.Throw.score}</b></p>
                  </>
                  : null
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}