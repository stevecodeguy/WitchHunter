import React, { useState, useEffect } from 'react';

import Skill from '../components/child_components/Skill';

import AuthAPI from '../../utils/context/AuthApi';

export default function CharacterSkills() {
  const [skills, setSkills] = useState(null);
  const [skillCategories, setSkillCategories] = useState(null);
  const [transferTo, setTransferTo] = useState(null);
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

  const transferSkills = (event) => {
    event.preventDefault();
    console.log(transferTo)
  }

  const transferChange = (event) => {
    event.preventDefault();
    setTransferTo(event.target.value);
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
                                  {skill.elective_skills >= 2 ?
                                    <>
                                      <label htmlFor="move">Transfer to: </label>
                                      <select name="move" id="move_elective" defaultValue="choose" onChange={(event) => transferChange(event)}>
                                        <option value="choose">(choose section)</option>
                                        {skill.category === 'Fighting' ? null : <option value="fighting">Fighting Skills</option>}
                                        {skill.category === 'Interaction' ? null : <option value="interaction">Interaction Skills</option>}
                                        {skill.category === 'Movement' ? null : <option value="movement">Movement Skills</option>}
                                        {skill.category === 'Professional' ? null : <option value="professional">Professional Skills</option>}
                                        {skill.category === 'Reaction' ? null : <option value="reaction">Reaction Skills</option>}
                                      </select>
                                      <p> (2/1 cost) </p>
                                      <button onClick={(event) => transferSkills(event)}>Transfer</button>
                                    </>
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