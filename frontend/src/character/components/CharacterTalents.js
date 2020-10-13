import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import Talents from '../components/child_components/Talents';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';
import { CharacterContext } from '../../utils/context/CharacterContext';

export default function CharacterTalents() {
  const auth = useContext(AuthContext);
  const { 
    abilities, 
    skills, 
    talents, 
    setTalents 
  } = useContext(CharacterContext);

  let history = useHistory();

  useEffect(() => {
    const getTalents = async () => {
      const talents = await AuthAPI.get('/characters/talents');
      console.log(talents)
      setTalents(talents.data.result);
    }

    getTalents();
  }, [setTalents]);

  return (
    <Talents />
  );
}