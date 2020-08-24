import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';

import TextEntry from '../components/child_components/TextEntry';
import TextAreaEntry from '../components/child_components/TextAreaEntry';
import Dropdown from '../components/child_components/Dropdown';
import Skill from '../components/child_components/Skill';

import '../css/characterInfo.css';

export default function CharacterInfo() {
  const [characterName, setCharacterName] = useState('');
  const [description, setDescription] = useState('');
  const [height, setHeight] = useState('');
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

  const saveCharacterInfo = async () => {
    if(!!auth.state.uuid){
      try {
        await AuthAPI.post(`http://localhost:3000/characters/save_info`, {
          characterName, description, height, weight, eyes, hair, culture, ethnicity, nationality, religion, background, catalyst, order, sinVice, virtue, heroPoints, trueFaith, damnation
        });
      } catch (error) {
        console.log(`Error saving: ${error}`);
      }
    }
  };

  return (
    <form method="post">

      <div>
        <ul>
          <TextEntry name="name" labelName="Character Name" set={setCharacterName} value={characterName} />
          <TextAreaEntry name="description" set={setDescription} value={description} />
          <TextEntry name="height" set={setHeight} value={height} />
          <TextEntry name="weight" set={setWeight} value={weight} />
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
          <Skill name="heroPoints" labelName="Hero Points" set={setHeroPoints} value={heroPoints} />
          <Skill name="trueFaith" labelName="True Faith" set={setTrueFaith} value={trueFaith} />
          <Skill name="damnation" set={setDamnation} value={damnation} />
        </ul>
        <button
          onClick={() => {
            saveCharacterInfo();
            history.push('/character/new/abilities');
          }}
        >Next</button>
      </div>
    </form>
  );
}