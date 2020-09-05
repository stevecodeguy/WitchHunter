import React, { useState, useEffect } from 'react';

import Counter from '../components/child_components/Counter';

import AuthAPI from '../../utils/context/AuthApi';

export default function CharacterSkills() {
  const [skills, setSkills] = useState(null);
  const [skillScores, setSkillScores] = useState(null);
  const [skillCategories, setSkillCategories] = useState(null);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const initial = await AuthAPI.get(`/characters/initial_skills`);
        setSkillScores(initial.data.result);

        let categories = await AuthAPI.get('/characters/skill_categories');
        for (const category in categories.data.result) {
          categories.data.result[category].id = parseInt(category);
        }
        setSkillCategories(categories.data.result);

        const skills = await AuthAPI.get(`/characters/skills`);
        setSkills(skills.data.result);
      } catch (error) {
        console.log(`Error getting Skill Categories: ${error}`);
      }
    };

    getSkills();
  }, []);

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
                        !!skills ?
                          (
                            skills.filter(skill => skill.category === category.category).map(skill => (
                                < Counter 
                                  key={skill.id} 
                                  name={skill.skill} 
                                  ability={skill.ability} 
                                  // set={skill} 
                                  // value={skillScores.skill} 
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