import React, { useState, useMemo } from 'react';

export const CharacterContext = React.createContext();

export const CharacterProvider = (props) => {
  // Character Info
  const [info, setInfo] = useState(() => {
    if (localStorage.getItem('character_info')) {
      const characterInfo = JSON.parse(localStorage.getItem('character_info'));
      const heightFeet = Math.floor(characterInfo.height / 12);
      const heightInches = characterInfo.height % 12;

      return {
        characterName: characterInfo.characterName,
        description: characterInfo.description,
        sex: characterInfo.sex,
        heightFeet: heightFeet,
        heightInches: heightInches,
        weight: characterInfo.weight,
        eyes: characterInfo.eyes,
        hair: characterInfo.hair,
        culture: characterInfo.culture,
        ethnicity: characterInfo.ethnicity,
        nationality: characterInfo.nationality,
        religion: characterInfo.religion,
        background: characterInfo.background,
        catalyst: characterInfo.catalyst,
        order: characterInfo.order,
        sinVice: characterInfo.sinVice,
        virtue: characterInfo.virtue,
        heroPoints: characterInfo.heroPoints,
        trueFaith: characterInfo.trueFaith,
        damnation: characterInfo.damnation
      }
    }
    return {
      characterName: '',
      description: '',
      sex: { id: 1, sex: 'Male' },
      heightFeet: '',
      heightInches: '',
      weight: '',
      eyes: '',
      hair: '',
      culture: '',
      ethnicity: '',
      nationality: '',
      religion: '',
      background: '',
      catalyst: '',
      order: '',
      sinVice: '',
      virtue: '',
      heroPoints: '',
      trueFaith: '',
      damnation: ''
    }
  });

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
  const [skills, setSkills] = useState(() => {
    if (localStorage.getItem('character_skills')) {
      return JSON.parse(localStorage.getItem('character_skills'));
    }
    return [];
  });
  // Skill categories Context
  const [skillCategories, setSkillCategories] = useState([]);
  // Background Electives Context
  const [backgroundElectives, setBackgroundElectives] = useState(() => {
    if (localStorage.getItem('character_electives')) {
      return JSON.parse(localStorage.getItem('character_electives'));
    }
    return [];
  });
  // Talents Context
  const [talents, setTalents] = useState(() => {
    if (localStorage.getItem('character_talents')) {
      return JSON.parse(localStorage.getItem('character_talents'));
    }
    return [];
  });
  // Talents Costs Context
  const [talentsBought, setTalentsBought] = useState(() => {
    if (localStorage.getItem('character_talent_costs')) {
      return JSON.parse(localStorage.getItem('character_talent_costs'));
    }
    return [];
  });
  // Inventory Context
  const [inventory, setInventory] = useState(() => {
    if (localStorage.getItem('character_inventory')) {
      return JSON.parse(localStorage.getItem('character_inventory'));
    }
    return {};
  });
  // Carry Limit Context
  const [carryLimit, setCarryLimit] = useState([]);

  // Money Context
  const [characterMoney, setCharacterMoney] = useState(() => {
    if (localStorage.getItem('character_money')) {
      return JSON.parse(localStorage.getItem('character_money'));
    }
    return {
      pounds: { amount: 0, abbreviation: '£ (Pounds)' },
      crowns: { amount: 0, abbreviation: 'c (Crowns)' },
      shilling: { amount: 0, abbreviation: 's (Shillings)' },
      penny: { amount: 0, abbreviation: 'd (Pennies)' },
      farthing: { amount: 0, abbreviation: 'f (Farthings)' },
      singleTotal: 0
    };
  });

  const value = useMemo(() => {
    return {
      abilityScore,
      backgroundElectives,
      carryLimit,
      characterMoney,
      inventory,
      info,
      skills,
      skillCategories,
      spentSkillPoints,
      talents,
      talentsBought,
      setAbilityScore,
      setBackgroundElectives,
      setCarryLimit,
      setCharacterMoney,
      setInfo,
      setInventory,
      setSkills,
      setSkillCategories,
      setSpentSkillPoints,
      setTalents,
      setTalentsBought
    }
  }, [
    abilityScore,
    backgroundElectives,
    carryLimit,
    characterMoney,
    inventory,
    info,
    skills,
    skillCategories,
    spentSkillPoints,
    talents,
    talentsBought,
    setAbilityScore,
    setBackgroundElectives,
    setCarryLimit,
    setCharacterMoney,
    setInfo,
    setInventory,
    setSkills,
    setSkillCategories,
    setSpentSkillPoints,
    setTalents,
    setTalentsBought
  ]);

  return (
    <CharacterContext.Provider value={value}>
      {props.children}
    </CharacterContext.Provider>
  );
}
