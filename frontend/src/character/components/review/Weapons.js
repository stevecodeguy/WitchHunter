import React, { useContext, useEffect, useState } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Weapons() {
  const { inventory, skills, abilityScore } = useContext(CharacterContext);
  const [handtoHand, setHandtoHand] = useState(0);
  const [handtoHandSmall, setHandtoHandSmall] = useState(0);
  const [archery, setArchery] = useState(0);
  const [firearms, setFirearms] = useState(0);
  const [thrown, setThrown] = useState(0);

  useEffect(() => {
    setHandtoHand(() => {
      const skill = skills.find(skill => skill.skill === 'Hand-to-Hand');
      const skillRank = skill.score;
      const abilityRank = abilityScore[skill.ability.toLowerCase()].score;

      return skillRank + abilityRank;
    });

    setHandtoHandSmall(() => {
      const skill = skills.find(skill => skill.skill === 'Hand-to-Hand (Small Weapons)');
      const skillRank = skill.score;
      const abilityRank = abilityScore[skill.ability.toLowerCase()].score;

      return skillRank + abilityRank;
    });

    setArchery(() => {
      const skill = skills.find(skill => skill.skill === 'Archery');
      const skillRank = skill.score;
      const abilityRank = abilityScore[skill.ability.toLowerCase()].score;

      return skillRank + abilityRank;
    });

    setFirearms(() => {
      const skill = skills.find(skill => skill.skill === 'Firearms');
      const skillRank = skill.score;
      const abilityRank = abilityScore[skill.ability.toLowerCase()].score;

      return skillRank + abilityRank;
    });

    setThrown(() => {
      const skill = skills.find(skill => skill.skill === 'Throw');
      const skillRank = skill.score;
      const abilityRank = abilityScore[skill.ability.toLowerCase()].score;

      return skillRank + abilityRank;
    });

  }, [abilityScore, skills]);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>WEAPONS</h3>
      </div>
      <div>
        <div className="side-by-side">
          <div className="together">
            <h5>Weapon:</h5>
            <p>Unarmed</p>
          </div>
          <div className="together">
            <h5>C:</h5>
            <p>0</p>
          </div>
          <div className="together">
            <h5>DM:</h5>
            <p>0</p>
          </div>
        </div>
        <div className="side-by-side">
          <div className="together">
            <h5>Range: </h5>
            <p>-</p>
          </div>
          <div className="together">
            <h5>Reload:</h5>
            <p>-</p>
          </div>
          <div className="together">
            <h5>Size:</h5>
            <p>Small</p>
          </div>
          <div className="together">
            <h5>Wgt:</h5>
            <p>-</p>
          </div>
        </div>
        <div className="side-by-side">
          <div className="together">
            <h5>Melee Dice: </h5>
            <p>{`AGI ${handtoHandSmall} -or- STR ${handtoHand} `}</p>
          </div>
          <div className="together">
            <h5>Ranged Dice:</h5>
            <p>0</p>
          </div>
        </div>
        <hr />
      </div>
      {
        [...Object.entries(inventory)].map(inv => {
          const invValues = Object.values(inv[1])

          return (
            <>
              {
                invValues[1] === 'Melee and Thrown' ||
                  invValues[1] === 'Archery' && inv[0] !== 'Arrow' && inv[0] !== 'Bolt' ||
                  invValues[1] === 'Firearms' && inv[0] !== 'Powder and Shot' ?
                  <div key={inv[1]}>
                    <div className="side-by-side">
                      <div className="together">
                        <h5>Weapon:</h5>
                        <p>{inv[0]}</p>
                      </div>
                      <div className="together">
                        <h5>C:</h5>
                        <p>{+inv[1].complexity}</p>
                      </div>
                      <div className="together">
                        <h5>DM:</h5>
                        <p>{inv[1].damage_modifier}</p>
                      </div>
                    </div>
                    <div className="side-by-side">
                      <div className="together">
                        <h5>Range: </h5>
                        <p>{inv[1].range}</p>
                      </div>
                      <div className="together">
                        <h5>Reload:</h5>
                        <p>{inv[1].reload}</p>
                      </div>
                      <div className="together">
                        <h5>Size:</h5>
                        <p>{inv[1].size}</p>
                      </div>
                      <div className="together">
                        <h5>Wgt:</h5>
                        <p>{inv[1].weight}</p>
                      </div>
                    </div>
                    <div className="side-by-side">
                      <div className="together">
                        <h5>Melee Dice: </h5>
                        <p>{
                          (
                            (inv[1].category === 'Melee and Thrown' && inv[1].size === 'Small' ? handtoHandSmall : 0) +
                            (inv[1].category === 'Melee and Thrown' && inv[1].size !== 'Small' ? handtoHand : 0) -
                            inv[1].complexity
                          ) < 0 ? 0 :
                            (
                              (inv[1].category === 'Melee and Thrown' && inv[1].size === 'Small' ? handtoHandSmall : 0) +
                              (inv[1].category === 'Melee and Thrown' && inv[1].size !== 'Small' ? handtoHand : 0) -
                              inv[1].complexity
                            )
                        }</p>
                      </div>
                      <div className="together">
                        <h5>Ranged Dice:</h5>
                        <p>{
                          (
                            (inv[1].category === 'Firearms' ? firearms : 0) +
                            (inv[1].category === 'Archery' ? archery - inv[1].complexity : 0) +
                            (inv[1].category === 'Melee and Thrown' ? thrown - inv[1].complexity_thrown : 0)
                          ) < 0 ? 0 :
                            (
                              (inv[1].category === 'Firearms' ? firearms : 0) +
                              (inv[1].category === 'Archery' ? archery - inv[1].complexity : 0) +
                              (inv[1].category === 'Melee and Thrown' ? thrown - inv[1].complexity_thrown : 0)
                            )
                        }</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                  : null
              }
            </>
          )
        })
      }
    </>
  );
}