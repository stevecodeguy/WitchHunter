import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Skill from '../components/child_components/Skill';
import TransferElectives from '../components/child_components/TransferElectives';

import AuthAPI from '../../utils/context/AuthApi';

export default function CharacterSkills() {
  const [skills, setSkills] = useState(null);
  const [skillCategories, setSkillCategories] = useState(null);
  const [backgroundElectives, setBackgroundElectives] = useState([]);

  let history = useHistory();

  useEffect(() => {
    const getSkills = async () => {
      try {
        const skillsResult = await AuthAPI.get(`/characters/skills`);
        const initialResult = await AuthAPI.get(`/characters/initial_skills`);
//         const abilitiesResult = await AuthAPI.get(`/characters/abilities_current`);
// console.log(abilitiesResult)

        let skillList = skillsResult.data.result;
        const initialList = initialResult.data.result;

        for (let key in skillList) {
          skillList[key].score = 0;
          skillList[key].minScore = 0;
          skillList[key].maxScore = 5;
        }

        initialList.forEach(iSkill => {
          const key = Object.keys(skillList).find(key => skillList[key].skill === iSkill.skill);
          skillList[key].score = iSkill.score;
          skillList[key].minScore = iSkill.score;
          skillList[key].maxScore = iSkill.score;
          console.log(iSkill)
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
  }, []);

  const setSkillsObject = (data) => {

    const eIndex = Object.keys(backgroundElectives).find(index => backgroundElectives[index].category === data.category);
    const electives = [...backgroundElectives];

    const index = Object.keys(skills).find(index => skills[index].skill === data.name);
    const newScores = [...skills];

    if (
      electives[eIndex].elective_skills - data.adjustment >= 0 &&
      newScores[index].score + data.adjustment >= newScores[index].minScore
    ) {
      electives[eIndex] = { ...electives[eIndex], elective_skills: electives[eIndex].elective_skills - data.adjustment };
      setBackgroundElectives(electives);

      newScores[index] = { ...newScores[index], score: newScores[index].score + data.adjustment };
      setSkills(newScores);
    }
  }

  const transferSkills = (skillDestination, skillSource) => {
    let bgElectives = backgroundElectives;
    const electiveSource = bgElectives.find(array => array.category === skillSource);
    if (electiveSource.elective_skills <= 1) return;
    if (!!electiveSource.transferredFrom && !!electiveSource.transferredFrom[skillDestination]) return refundSkills(skillDestination, skillSource);

    let electiveMove = 0;
    if (!!electiveSource.elective_skills){
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
    if (!!electiveSource.transferredFrom && !!electiveSource.transferredFrom[skillDestination]){
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

          }}
        >Next</button>
        <button
          type="button"
          onClick={() => {
            history.push('/character/new/abilities');
          }}
        >Ignore</button>
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