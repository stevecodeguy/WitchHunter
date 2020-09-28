import React, {
  useState, 
  useMemo
} from 'react';

export const CharacterContext = React.createContext();

export const CharacterProvider = (props) => {
  const [abilityScore, setAbilityScore] = useState({
    strength: { score: 2, minimum: 1 },
    agility: { score: 2, minimum: 1 },
    toughness: { score: 2, minimum: 1 },
    education: { score: 2, minimum: 1 },
    reason: { score: 2, minimum: 1 },
    will: { score: 2, minimum: 1 },
    courage: { score: 2, minimum: 1 },
    intuition: { score: 2, minimum: 1 },
    personality: { score: 2, minimum: 1 }
  });

  const value = useMemo(() => {
    return {
      abilityScore,
      setAbilityScore
    }
  }, [abilityScore, setAbilityScore]);

  return (
    <CharacterContext.Provider value={value}>
      {props.children}
    </CharacterContext.Provider>
  );
}
