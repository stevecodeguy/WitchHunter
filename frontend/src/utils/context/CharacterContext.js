import React, {
  useState,
  useMemo
} from 'react';

export const CharacterContext = React.createContext();

export const CharacterProvider = (props) => {
  // Ability Score Context
  const [abilityScore, setAbilityScore] = useState(() => {
    if (localStorage.getItem('character_abilities')) {
      const characterAbilities = JSON.parse(localStorage.getItem('character_abilities'));
      return {
        strength: { score: characterAbilities.strength.score, minimum: characterAbilities.strength.minimum },
        agility: { score: characterAbilities.agility.score, minimum: characterAbilities.agility.minimum },
        toughness: { score: characterAbilities.toughness.score, minimum: characterAbilities.toughness.minimum },
        education: { score: characterAbilities.education.score, minimum: characterAbilities.education.minimum },
        reason: { score: characterAbilities.reason.score, minimum: characterAbilities.reason.minimum },
        will: { score: characterAbilities.will.score, minimum: characterAbilities.will.minimum },
        courage: { score: characterAbilities.courage.score, minimum: characterAbilities.courage.minimum },
        intuition: { score: characterAbilities.intuition.score, minimum: characterAbilities.intuition.minimum },
        personality: { score: characterAbilities.personality.score, minimum: characterAbilities.personality.minimum }
      };
    }
    return {
      strength: { score: 2, minimum: 1 },
      agility: { score: 2, minimum: 1 },
      toughness: { score: 2, minimum: 1 },
      education: { score: 2, minimum: 1 },
      reason: { score: 2, minimum: 1 },
      will: { score: 2, minimum: 1 },
      courage: { score: 2, minimum: 1 },
      intuition: { score: 2, minimum: 1 },
      personality: { score: 2, minimum: 1 }
    }
  });
  // Spent Skill Points Context
  const [spentSkillPoints, setSpentSkillPoints] = useState(() => {
    if (localStorage.getItem('character_abilities_spent')) {
      return JSON.parse(localStorage.getItem('character_abilities_spent'));
    }
    return 0;
  });
  // Skill scores Context
  const [skills, setSkills] = useState([]);

  const value = useMemo(() => {
    return {
      abilityScore,
      skills,
      spentSkillPoints,
      setAbilityScore,
      setSkills,
      setSpentSkillPoints
    }
  }, [
    abilityScore,
    skills,
    spentSkillPoints,
    setAbilityScore,
    setSkills,
    setSpentSkillPoints
  ]);

  return (
    <CharacterContext.Provider value={value}>
      {props.children}
    </CharacterContext.Provider>
  );
}
