import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';

import TextEntry from '../components/child_components/TextEntry';
import TextAreaEntry from '../components/child_components/TextAreaEntry';
import Dropdown from '../components/child_components/Dropdown';
import Counter from './child_components/Counter';
import Height from './child_components/Height';

import '../css/characterInfo.css';

export default function CharacterInfo() {
  const [characterName, setCharacterName] = useState('');
  const [description, setDescription] = useState('');
  const [sex, setSex] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [eyes, setEyes] = useState('');
  const [hair, setHair] = useState('');
  const [culture, setCulture] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [nationality, setNationality] = useState('');
  const [religion, setReligion] = useState('');
  const [background, setBackground] = useState('');
  const [catalyst, setCatalyst] = useState('');
  const [order, setOrder] = useState('');
  const [sinVice, setSinVice] = useState('');
  const [virtue, setVirtue] = useState('');
  const [heroPoints, setHeroPoints] = useState(0);
  const [trueFaith, setTrueFaith] = useState(0);
  const [damnation, setDamnation] = useState(0);

  const auth = useContext(AuthContext);
  let history = useHistory();

  const checkForm = () => {
    if (
      characterName === '' ||
      sex === '' ||
      heightFeet === '' ||
      heightInches === '' ||
      weight === '' ||
      eyes === '' ||
      hair === '' ||
      culture === '' ||
      ethnicity === '' ||
      nationality === '' ||
      religion === '' ||
      background === '' ||
      catalyst === '' ||
      order === '' ||
      sinVice === '' ||
      virtue === ''
    ) {
      return false;
    }
    return true;
  }

  const saveCharacterInfo = async () => {
    if (!!auth.state.uuid) {
      try {
        if (checkForm()) {
          const height = (heightFeet * 12) + heightInches;
          await AuthAPI.post(`/characters/save_info`, {
            characterName, description, sex, height, weight, eyes, hair, culture, ethnicity, nationality, religion, background, catalyst, order, sinVice, virtue, heroPoints, trueFaith, damnation
          });
        };
      } catch (error) {
        console.log(`Error saving: ${error}`);
      }
    }
  };

  useEffect(() => {
    if (sex.sex === 'Male') {
      setHeightFeet(5);
      setHeightInches(5);
      setWeight(150);
    } else if (sex.sex === 'Female') {
      setHeightFeet(5);
      setHeightInches(1);
      setWeight(125);
    }
  }, [sex]);

  return (
    <form method="post">
      <div>
        <ul>
          <TextEntry name="name" labelName="Character Name" set={setCharacterName} value={characterName} />
          <TextAreaEntry name="description" set={setDescription} value={description} />
          <Dropdown name="sex" set={setSex} value={sex} />
          <Height
            name="height"
            setFt={setHeightFeet}
            valueFt={heightFeet}
            setIn={setHeightInches}
            valueIn={heightInches} />
          <Counter name="weight" set={setWeight} value={weight} />
          <TextEntry name="eyes" set={setEyes} value={eyes} />
          <TextEntry name="hair" set={setHair} value={hair} />
          <TextEntry name="culture" set={setCulture} value={culture} />
          <TextEntry name="ethnicity" set={setEthnicity} value={ethnicity} />
          <TextEntry name="nationality" set={setNationality} value={nationality} />
          <Dropdown name="religion" set={setReligion} value={religion} />
          <Dropdown name="background" set={setBackground} value={background} />
          <TextEntry name="catalyst" set={setCatalyst} value={catalyst} />
          <Dropdown name="order" set={setOrder} value={order} />
          <Dropdown name="sin_vice" labelName="Sin / Vice" set={setSinVice} value={sinVice} />
          <Dropdown name="virtue" set={setVirtue} value={virtue} />
          <Counter name="heroPoints" labelName="Hero Points" set={setHeroPoints} value={heroPoints} />
          <Counter name="trueFaith" labelName="True Faith" set={setTrueFaith} value={trueFaith} />
          <Counter name="damnation" set={setDamnation} value={damnation} />
        </ul>
        <button
          onClick={() => {
            if (checkForm()) {
              saveCharacterInfo();
              history.push('/character/new/abilities');
            }
          }}
        >Next</button>
        <button
          onClick={() => {
              history.push('/character/new/abilities');
          }}
        >Ignore</button> 
        {/* TEMP BUTTON 'IGNORE'. Remove later */}
      </div>
    </form>
  );
}