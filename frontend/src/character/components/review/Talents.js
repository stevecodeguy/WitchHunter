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
      <div className="side-by-side">
        <div className="side-by-side skill-totals">
          <div>
            <div className="side-by-side">
              <h5>SKILL (ABILITY)</h5>
              <h5 className="tiny">TOTAL = RANK + ABILITY + BONUS</h5>
            </div>
            {/* {skillCategories.map(cat => (
              cat.category !== 'Professional' ?
                (
                  <>
                    <h6 key={cat.category}>{cat.category.toUpperCase()} SKILLS</h6>
                    {
                      skills.map(skill => (
                        skill.category === cat.category && cat.category !== 'Professional' ?
                          <div key={skill.id} className="side-by-side">
                            <p>{skill.skill}</p>
                            <p><b>{skill.score + abilityScore[skill.ability.toLowerCase()].score}</b>= {skill.score} + {abilityScore[skill.ability.toLowerCase()].score} + __</p>
                          </div>
                          : null
                      ))
                    }
                  </>
                ) : null
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}