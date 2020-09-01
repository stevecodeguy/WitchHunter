import React, { useState, useEffect } from 'react';

import Counter from '../components/child_components/Counter';

import AuthAPI from '../../utils/context/AuthApi';

export default function CharacterAbilityScores() {
  const [skills, setSkills] = useState(null);
  const [skillCategories, setSkillCategories] = useState(null);

  useEffect(() => {
    const getSkillCategories = async () => {
      try {
        let results = await AuthAPI.get('/characters/skill_categories');
        for (const category in results.data.result){
          results.data.result[category].id = parseInt(category);
        }
        setSkillCategories(results.data.result);
      } catch (error) {
        console.log(`Error getting Skill Categories: ${error}`);
      }
    };

    const getSkills = async () => {
      try {
        const results = await AuthAPI.get(`/characters/skills`);
        setSkills(results.data.result);
      } catch (error) {
        console.log(`Error getting Skills: ${error}`);
      }
    };

    const getInitialSkills = async () => {
      try {
        const results = await AuthAPI.get(`/characters/initial_skills`);
        for (const result in results.data){
          console.log(result);
          // setSkills({
          //   ...skills, 
          //   [results.data.result.id]: results.data.result.id,
          //   [results.data.result.skill]: results.data.result.skill,
          //   [results.data.result.score]: results.data.result.score,
          //   [results.data.result.sub_skill]: results.data.result.sub_skill,
          //   [results.data.result.option]: results.data.result.option
          // });
        }
      } catch (error) {
        console.log(`Error getting Initial Skills: ${error}`);
      }
    };

    getSkillCategories();
    getSkills();
    getInitialSkills();
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
                        // skills === null ?
                        //   null :
                        //   (
                        //     skills.map(skill => (
                        //       skill.category === category.category ?
                        //         < Counter 
                        //           key={skill.id} 
                        //           name={skill.skill} 
                        //           ability={skill.ability} 

                        //           // set={skill} 
                        //           // value={skill} 
                        //         />
                        //         : null
                        //     ))
                        //   )
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