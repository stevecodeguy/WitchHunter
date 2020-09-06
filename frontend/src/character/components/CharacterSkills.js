import React, { useState, useEffect } from 'react';

import Skill from '../components/child_components/Skill';

import AuthAPI from '../../utils/context/AuthApi';

export default function CharacterSkills() {
  const [skills, setSkills] = useState(null);
  const [skillCategories, setSkillCategories] = useState(null);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const skillsResult = await AuthAPI.get(`/characters/skills`);
        const initialResult = await AuthAPI.get(`/characters/initial_skills`);

        let skillList = skillsResult.data.result;
        const initialList = initialResult.data.result;

        for (let key in skillList) {
          skillList[key].score = 0
        }

        initialList.map(iSkill => {
          const key = Object.keys(skillList).find(key => skillList[key].skill === iSkill.skill);
          skillList[key].score = iSkill.score;
        });

        setSkills( skillList );

        let categories = await AuthAPI.get('/characters/skill_categories');
        for (const category in categories.data.result) {
          categories.data.result[category].id = parseInt(category);
        }
        setSkillCategories(categories.data.result);

      } catch (error) {
        console.log(`Error getting Skills: ${error}`);
      }
    };

    getSkills();
  }, []);

  const setSkillsObject = (data) => {
    const index = Object.keys(skills).find(index => skills[index].skill === data.name);
    const newScores = [...skills];
    newScores[index] = {...newScores[index], score: data.adjustment };
    setSkills(newScores)
  }

  return (
    <form method="post">

      <div>
        {
          skillCategories === null ?
            null :
            (
              <div>
                {
                  skillCategories.map(category => (
                    <ul key={category.id}>
                      <h5>{category.category} Skills</h5>
                      {
                        skills.length > 0 ?
                          (
                            skills.filter(skill => skill.category === category.category).map(skill => (
                              <Skill
                                key={skill.id}
                                name={skill.skill}
                                ability={skill.ability}
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