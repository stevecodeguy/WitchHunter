import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Skill from '../components/child_components/Skill';
import TransferElectives from '../components/child_components/TransferElectives';

import AuthAPI from '../../utils/context/AuthApi';
import { CharacterContext } from '../../utils/context/CharacterContext';

export default function CharacterSkills() {
  // const [skills, setSkills] = useState([]);
  const [skillCategories, setSkillCategories] = useState([]);
  const [backgroundElectives, setBackgroundElectives] = useState([]);
  const { abilityScore, skills, setSkills } = useContext(CharacterContext)

  let history = useHistory();

  useEffect(() => {
    const getSkills = async () => {
      try {
        const skillsResult = await AuthAPI.get(`/characters/skills`);
        const initialResult = await AuthAPI.get(`/characters/initial_skills`);

        let skillList = skillsResult.data.result;
        const initialList = initialResult.data.result;

        for (let key in skillList) {
          skillList[key].score = 0;
          skillList[key].minScore = 0;
          skillList[key].maxScore = abilityScore[skillList[key].ability.toLowerCase()];
        }

        initialList.forEach(initSkill => {
          const key = Object.keys(skillList).find(key => skillList[key].skill === initSkill.skill);
          skillList[key].score = initSkill.score;
          skillList[key].minScore = initSkill.score;
        });

        setSkills(skillList);

        let categories = await AuthAPI.get('/characters/skill_categories');
        for (const category in categories.data.result) {
          categories.data.result[category].id = parseInt(category);
        }
        setSkillCategories(categories.data.result);

        let backgroundCategories = await AuthAPI.get('/characters/background_categories');
        setBackgroundElectives(backgroundCategories.data.result);

      } catch (error) {
        console.log(`Error getting Skills: ${error}`);
      }
    };

    getSkills();
  }, [abilityScore, setSkills]);


  const setSkillsObject = (data) => {

    const eIndex = Object.keys(backgroundElectives).find(index => backgroundElectives[index].category === data.category);
    const electives = [...backgroundElectives];

    const index = Object.keys(skills).find(index => skills[index].skill === data.name);
    const newScores = [...skills];

    // scoreAdjust will calulate what the value will change to.
    // electiveAdjust will remove the value from the elective points remaining.
    let scoreAdjust = 0;
    let electiveAdjust = 0;

    // data.overwrite will catch if the adjustment was a typed value, or a +/- click.
    if (data.overwrite) {
      scoreAdjust = data.adjustment;
      electiveAdjust = electives[eIndex].elective_skills - data.adjustment + newScores[index].score;
    } else {
      scoreAdjust = newScores[index].score + data.adjustment;
      electiveAdjust = electives[eIndex].elective_skills - data.adjustment;
    }

    // electives[eIndex] returns category adjusted and the number of elective skills remaining
    // newScores[index] returns the entire object for the skills (ability, category, max, min, current score, skill name)

    if (
      electiveAdjust >= 0 &&
      (scoreAdjust >= newScores[index].minScore &&
        scoreAdjust <= newScores[index].maxScore)
    ) {
      electives[eIndex] = { ...electives[eIndex], elective_skills: electiveAdjust };
      setBackgroundElectives(electives);

      newScores[index] = { ...newScores[index], score: scoreAdjust };
      setSkills(newScores);
    }
  }


  const transferSkills = (skillDestination, skillSource) => {
    let bgElectives = backgroundElectives;
    const electiveSource = bgElectives.find(array => array.category === skillSource);
    if (electiveSource.elective_skills <= 1) return;
    if (!!electiveSource.transferredFrom && !!electiveSource.transferredFrom[skillDestination]) return refundSkills(skillDestination, skillSource);

    let electiveMove = 0;
    if (!!electiveSource.elective_skills) {
      electiveMove = electiveSource.elective_skills
    }

    for (const index in bgElectives) {
      // Reduce transferred skills by 2
      if (bgElectives[index].category === skillSource) {
        bgElectives[index].elective_skills = 0;
      }

      // Create transferredFrom object to contain where the skills came from.
      if (bgElectives[index].category === skillDestination) {
        if (bgElectives[index].transferredFrom === undefined) {
          bgElectives[index].transferredFrom = {};
        }

        bgElectives[index].elective_skills += Math.floor(electiveMove / 2);

        bgElectives[index].transferredFrom = {
          ...bgElectives[index].transferredFrom,
          [skillSource]: bgElectives[index].transferredFrom[skillSource] + electiveMove || electiveMove
        }
      }
    }

    setBackgroundElectives([...bgElectives]);
  }


  const refundSkills = (skillDestination, skillSource) => {
    let bgElectives = backgroundElectives;
    const electiveSource = bgElectives.find(array => array.category === skillSource);

    let electiveMove = 0;
    if (!!electiveSource.transferredFrom && !!electiveSource.transferredFrom[skillDestination]) {
      electiveMove = electiveSource.transferredFrom[skillDestination]
    }

    for (const index in bgElectives) {
      // If the source contains the destination in the transferred from object lower the amount by amount originally transferred.
      if (bgElectives[index].category === skillSource) {
        if (!!bgElectives[index].transferredFrom && !!bgElectives[index].transferredFrom[skillDestination]) {
          bgElectives[index].transferredFrom[skillDestination] = bgElectives[index].transferredFrom[skillDestination] - electiveMove;
          delete bgElectives[index].transferredFrom[skillDestination];
        }

        bgElectives[index].elective_skills -= 1;
      }

      // Refund skills to the original source.
      if (bgElectives[index].category === skillDestination) {
        bgElectives[index].elective_skills += electiveMove;
      }
    }

    setBackgroundElectives([...bgElectives]);
  }


  return (
    <form method="post">

      <div>
        <h3>Choose Elective Skills</h3>
        {
          skillCategories === null ?
            null :
            (
              <div>
                {
                  skillCategories.map(category => (
                    <ul key={category.id}>
                      <h4>{category.category} Skills</h4>
                      {
                        backgroundElectives.length > 0 ?
                          (
                            backgroundElectives.filter(elective => elective.category === category.category).map(skill => (
                              skill.elective_skills > 0 ?
                                <div key={skill.id + skill.elective_skills}  >
                                  <h5 className="elective_points">{skill.elective_skills} Elective Skill{skill.elective_skills > 1 ? ('s') : null}</h5>
                                  {skill.elective_skills >= 1 ?
                                    <TransferElectives
                                      category={skill.category}
                                      electives={skill.elective_skills}
                                      transferredFrom={skill.transferredFrom}
                                      transferSkills={transferSkills}
                                      refundSkills={refundSkills}
                                    />
                                    : null}
                                </div>
                                : null
                            ))
                          ) : null
                      }
                      {
                        skills.length > 0 ?
                          (
                            skills.filter(skill => skill.category === category.category).map(skill => (
                              <Skill
                                key={skill.id}
                                name={skill.skill}
                                ability={skill.ability}
                                category={skill.category}
                                max={skill.maxScore}
                                set={(data) => setSkillsObject(data)}
                                value={skill.score}
                              />
                            ))
                          ) : null
                      }
                    </ul>
                  ))
                }
              </div>
            )
        }
        <button
          type="button"
          onClick={() => {
            history.push('/character/new/talents');
          }}
        >Next</button>
        <button
          type="button"
          onClick={() => {
          }}
        >Fill</button>
        {/* TEMP BUTTON 'IGNORE' and 'FILL'. Remove later */}
      </div>
    </form >
  );
}