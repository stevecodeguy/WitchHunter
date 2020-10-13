import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Skill from '../components/child_components/Skill';
import TransferElectives from '../components/child_components/TransferElectives';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';
import { CharacterContext } from '../../utils/context/CharacterContext';

export default function CharacterSkills() {
  const [skillCategories, setSkillCategories] = useState([]);

  const auth = useContext(AuthContext);
  const {
    abilityScore,
    backgroundElectives,
    skills,
    setBackgroundElectives,
    setSkills
  } = useContext(CharacterContext);

  let history = useHistory();

  //TEMP CODE
  const setFakeCharacter = () => {
    setSkills([{
      "id": 1, "category": "Fighting", "skill": "Archery", "ability": "Agility", "score": 1, "minScore": 0, "maxScore": 4
    }, { "id": 2, "category": "Fighting", "skill": "Firearms", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 3, "category": "Fighting", "skill": "Grapple", "ability": "Strength", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 4, "category": "Fighting", "skill": "Hand-to-Hand", "ability": "Strength", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 5, "category": "Fighting", "skill": "Hand-to-Hand (Small Weapons)", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 6, "category": "Fighting", "skill": "Throw", "ability": "Strength", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 7, "category": "Interaction", "skill": "Charm", "ability": "Personality", "score": 2, "minScore": 1, "maxScore": 2 }, { "id": 8, "category": "Interaction", "skill": "Command", "ability": "Courage", "score": 1, "minScore": 0, "maxScore": 3 }, { "id": 9, "category": "Interaction", "skill": "Deceive", "ability": "Personality", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 10, "category": "Interaction", "skill": "Empathy", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 11, "category": "Interaction", "skill": "Intimidate", "ability": "Personality", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 12, "category": "Interaction", "skill": "Pantomime", "ability": "Personality", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 13, "category": "Movement", "skill": "Acrobatics", "ability": "Agility", "score": 1, "minScore": 0, "maxScore": 4 }, { "id": 14, "category": "Movement", "skill": "Climb", "ability": "Strength", "score": 1, "minScore": 0, "maxScore": 4 }, { "id": 15, "category": "Movement", "skill": "Contortionist", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 16, "category": "Movement", "skill": "Drive", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 17, "category": "Movement", "skill": "Jump", "ability": "Strength", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 18, "category": "Movement", "skill": "Ride", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 19, "category": "Movement", "skill": "Row", "ability": "Strength", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 20, "category": "Movement", "skill": "Stealth", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 21, "category": "Movement", "skill": "Swim", "ability": "Strength", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 22, "category": "Professional", "skill": "Animal Care", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 23, "category": "Professional", "skill": "Construct", "ability": "Education", "score": 2, "minScore": 1, "maxScore": 2 }, { "id": 24, "category": "Professional", "skill": "Disable", "ability": "Reason", "score": 3, "minScore": 1, "maxScore": 3 }, { "id": 25, "category": "Professional", "skill": "Evaluate", "ability": "Education", "score": 1, "minScore": 1, "maxScore": 2 }, { "id": 26, "category": "Professional", "skill": "Gamble", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 27, "category": "Professional", "skill": "Gossip", "ability": "Personality", "score": 1, "minScore": 1, "maxScore": 2 }, { "id": 28, "category": "Professional", "skill": "Heal", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 29, "category": "Professional", "skill": "Herbalism", "ability": "Education", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 30, "category": "Professional", "skill": "Myth and Lore", "ability": "Education", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 31, "category": "Professional", "skill": "Navigation", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 32, "category": "Professional", "skill": "Occult", "ability": "Education", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 33, "category": "Professional", "skill": "Perform", "ability": "Personality", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 34, "category": "Professional", "skill": "Research", "ability": "Reason", "score": 0, "minScore": 0, "maxScore": 3 }, { "id": 35, "category": "Professional", "skill": "Sail", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 36, "category": "Professional", "skill": "Sorcerous Tradition: Animism", "ability": "Will", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 37, "category": "Professional", "skill": "Sorcerous Tradition: Diabolism", "ability": "Personality", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 38, "category": "Professional", "skill": "Sorcerous Tradition: Hermetic", "ability": "Education", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 39, "category": "Professional", "skill": "Sorcerous Tradition: Necromancy", "ability": "Reason", "score": 0, "minScore": 0, "maxScore": 3 }, { "id": 40, "category": "Professional", "skill": "Sorcerous Tradition: Prayer", "ability": "Courage", "score": 0, "minScore": 0, "maxScore": 3 }, { "id": 41, "category": "Professional", "skill": "Sorcerous Tradition: Witchcraft", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 42, "category": "Professional", "skill": "Speak Language", "ability": "-", "score": 0, "minScore": 0, "maxScore": null }, { "id": 43, "category": "Professional", "skill": "Subterfuge", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 44, "category": "Professional", "skill": "Survival", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 45, "category": "Professional", "skill": "Track", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 46, "category": "Professional", "skill": "Trade", "ability": "Reason", "score": 1, "minScore": 1, "maxScore": 3 }, { "id": 47, "category": "Professional", "skill": "Trained Knowledge", "ability": "Education", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 48, "category": "Reaction", "skill": "Balance", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 49, "category": "Reaction", "skill": "Concentrate", "ability": "Will", "score": 2, "minScore": 0, "maxScore": 2 }, { "id": 50, "category": "Reaction", "skill": "Endurance", "ability": "Toughness", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 51, "category": "Reaction", "skill": "Notice", "ability": "Intuition", "score": 0, "minScore": 0, "maxScore": 2 }, { "id": 52, "category": "Reaction", "skill": "Parry", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 53, "category": "Reaction", "skill": "Reflexes", "ability": "Agility", "score": 0, "minScore": 0, "maxScore": 4 }, { "id": 54, "category": "Reaction", "skill": "Resolve", "ability": "Courage", "score": 0, "minScore": 0, "maxScore": 3 }, { "id": 55, "category": "Professional", "skill": "Read Language", "ability": "-", "score": 0, "minScore": 0, "maxScore": null }]);

    setBackgroundElectives([{ "id": 6, "category": "Fighting", "elective_skills": 0 }, { "id": 7, "category": "Interaction", "elective_skills": 0 }, { "id": 8, "category": "Movement", "elective_skills": 0 }, { "id": 9, "category": "Professional", "elective_skills": 0 }, { "id": 10, "category": "Reaction", "elective_skills": 0 }]);
  }

  useEffect(() => {
    const getSkills = async () => {
      try {
        const skillsResult = await AuthAPI.get(`/characters/skills`);
        const initialResult = await AuthAPI.get(`/characters/initial_skills`);

        let skillList = skillsResult.data.result;
        const initialList = initialResult.data.result;

        if (skills.length === 0) {
          for (let key in skillList) {
            skillList[key].score = 0;
            skillList[key].minScore = 0;
            skillList[key].maxScore =
              !!abilityScore[skillList[key].ability.toLowerCase()] ?
                abilityScore[skillList[key].ability.toLowerCase()].score :
                null;
          }

          initialList.forEach(initSkill => {
            const key = Object.keys(skillList).find(key => skillList[key].skill === initSkill.skill);
            skillList[key].score = initSkill.score;
            skillList[key].minScore = initSkill.score;
          });

          setSkills(skillList);

          let backgroundCategories = await AuthAPI.get('/characters/background_categories');
          setBackgroundElectives(backgroundCategories.data.result);
        }

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
  }, [abilityScore, setSkills, setBackgroundElectives, skills.length]);


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

  const checkSkills = () => {
    const electivesRemaining = backgroundElectives.reduce((acc, cur) => acc + cur.elective_skills, 0);

    if (electivesRemaining === 0) {
      return true;
    }
    alert("You must spend all electives before continuing!");
    return false;
  }

  const saveSkills = async () => {
    if (!!auth.state.uuid) {
      try {
        if (checkSkills()) {
          localStorage.setItem('character_skills', JSON.stringify(skills));
          localStorage.setItem('character_electives', JSON.stringify(backgroundElectives));
          await AuthAPI.post(`/characters/save_skills`, skills);
        }
      } catch (error) {
        console.log(`Error saving abilities: ${error}`);
      }
    }
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
            if (checkSkills()) {
              saveSkills();
              history.push('/character/new/talents');
            }
          }}
        >Next</button>
        <button
          type="button"
          onClick={() => {
            history.push('/character/new/abilities');
          }}
        >Back to Character Abilities</button>
        <button
          type="button"
          onClick={() => {
            setFakeCharacter();
          }}
        >Fill</button>
        {/* TEMP BUTTON 'FILL'. Remove later */}
      </div>
    </form >
  );
}