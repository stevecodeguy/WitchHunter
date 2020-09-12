import React, { useState, useEffect } from 'react';

import Skill from '../components/child_components/Skill';
import TransferElectives from '../components/child_components/TransferElectives';

import AuthAPI from '../../utils/context/AuthApi';

export default function CharacterSkills() {
  const [skills, setSkills] = useState(null);
  const [skillCategories, setSkillCategories] = useState(null);
  const [backgroundElectives, setBackgroundElectives] = useState([]);

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
        }

        initialList.map(iSkill => {
          const key = Object.keys(skillList).find(key => skillList[key].skill === iSkill.skill);
          skillList[key].score = iSkill.score;
          skillList[key].minScore = iSkill.score;
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

  const transferSkills = (transferTo, category) => {
    let bgElectives = backgroundElectives;
    const newElectives = bgElectives.find(array => array.category === category);
    if (newElectives.elective_skills <= 1) return;

    for (const index in bgElectives) {
      if (bgElectives[index].category === category) {
        // if (!!bgElectives[index].transferredFrom) {
        //   console.log('in here')
        //   if (!!bgElectives[index].transferredFrom[transferTo] && bgElectives[index].transferredFrom[transferTo] > 1) {
        //     console.log('minused')
        //     bgElectives[index].transferredFrom[transferTo] = bgElectives[index].transferredFrom[transferTo] - 1;
        //   } else {
        //     console.log('deleted')
        //     delete bgElectives[index].transferredFrom[transferTo];
        //   }
        // }

        bgElectives[index].elective_skills -= 2;
      }

      if (bgElectives[index].category === transferTo) {
        if (bgElectives[index].transferredFrom === undefined) {
          bgElectives[index].transferredFrom = {};
        }

        bgElectives[index].elective_skills += 1;
        bgElectives[index].transferredFrom = {
          ...bgElectives[index].transferredFrom,
          [category]: bgElectives[index].transferredFrom[category] + 1 || 1
        }
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
      </div>
    </form >
  );
}