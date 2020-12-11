import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';

import TextEntry from '../components/info/TextEntry';
import TextAreaEntry from '../components/info/TextAreaEntry';
import Dropdown from '../components/info/Dropdown';
import Counter from '../components/info/Counter';
import Height from '../components/info/Height';

import '../css/characterInfo.css';
import { CharacterContext } from '../../utils/context/CharacterContext';

export default function CharacterInfo() {
  const { info, setInfo } = useContext(CharacterContext);
  const {
    characterName,
    description,
    sex,
    heightFeet,
    heightInches,
    weight,
    eyes,
    hair,
    culture,
    ethnicity,
    nationality,
    religion,
    background,
    catalyst,
    order,
    sinVice,
    virtue,
    heroPoints,
    trueFaith,
    damnation
  } = info;

  const auth = useContext(AuthContext);
  let history = useHistory();

  // Check if all data points are filled out
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

  // Save character info to database and localStorage
  const saveCharacterInfo = async () => {
    if (!!auth.state.uuid) {
      try {
        if (checkForm()) {
          const height = (heightFeet * 12) + heightInches;
          const characterObject = { characterName, description, sex, height, weight, eyes, hair, culture, ethnicity, nationality, religion, background, catalyst, order, sinVice, virtue, heroPoints, trueFaith, damnation }

          localStorage.setItem('character_info', JSON.stringify(characterObject));
          await AuthAPI.post(`/characters/save_info`, characterObject);
        };
      } catch (error) {
        console.log(`Error saving: ${error}`);
      }
    }
  };

  // TEMP CODE - fill out a new character
  const setFakeCharacter = () => {
    setInfo(
      {
        ...info,
        characterName: 'Testor the barbarian',
        description: 'Test from Front End',
        sex: { id: 1, sex: "Male" },
        heightFeet: 6,
        heightInches: 5,
        weight: 210,
        eyes: 'Blue',
        hair: 'Black',
        culture: 'French',
        ethnicity: 'English',
        nationality: 'Spanish',
        religion: { id: 1, religion: "Catholic" },
        background: {
          id: 2,
          background: "Artisan",
          social_standing: "Artisan",
          ability: "Muse",
          ability_description: "Once per day per point of reason while making a Professional action, +2 dice."
        },
        catalyst: 'Stubbed toe',
        order: {
          id: 1,
          order: "Apostles of the New Dawn",
          description: "Wherever expeditions travel, whenever new lands are discovered, the Apostles of the New Dawn are there. They are always on the edge of the known frontier, seeking out new places, new cultures, and of course facing new dangers. The Apostles face the evils of new lands so that those who follow them will not have to.",
          benefits: [
            {
              "id": 1,
              "fk_order_id": 1,
              "benefit": "Double Education in skill points to buy languages"
            },
            {
              "id": 2,
              "fk_order_id": 1,
              "benefit": "Recreate prayer or hermetic rite without talent or rite skill (must meet other requirements). Must have charms and materials. Difficulty +2. May not recreate the same effect twice in the same adventure."
            }
          ]
        },
        sinVice: {
          id: 1,
          sin_vice: "Bloodthirsty",
          benefit: "Physical attacks that deal damage add bonus dice equal to your Personality to the roll for damage successes"
        },
        virtue: {
          id: 1,
          virtue: "Chaste",
          description: "You hold your virtue sacred and do not give in to the pleasures of the flesh."
        },
        heroPoints: 6,
        trueFaith: 5,
        damnation: 4
      }
    );
  }

  // Set default height and weight averages based on gender for the 1600's
  useEffect(() => {
    if (sex === 'Male' && !localStorage.getItem('character_info')) {
      setInfo({
        ...info,
        heightFeet: 5,
        heightInches: 5,
        weight: 150
      });
    } else if (sex === 'Female' && !localStorage.getItem('character_info')) {
      setInfo({
        ...info,
        heightFeet: 5,
        heightInches: 1,
        weight: 125
      });
    }
  }, [sex, info, setInfo]);


  return (
    <form method="post">
      <div>
        <button
          type="button"
          onClick={() => {
            if (checkForm()) {
              saveCharacterInfo();
              history.push('/character/new/abilities');
            }
          }}
        >Next</button>
        <button
          type="button"
          onClick={() => {
            history.push('/characters');
          }}
        >Back to Character Selection</button>
        <button
          type="button"
          onClick={() => {
            setFakeCharacter();
          }}
        >Fill</button>
        {/* TEMP BUTTON 'FILL'. Remove later */}
        <ul>
          <TextEntry name="name" labelName="Character Name" set={setInfo} info={info} value={characterName} />
          <TextAreaEntry name="description" set={setInfo} info={info} value={description} />
          <Dropdown name="sex" set={setInfo} info={info} value={sex} />
          <Height
            name="height"
            info={info}
            set={setInfo}
            valueFt={heightFeet}
            valueIn={heightInches} />
          <Counter name="weight" set={setInfo} info={info} value={weight} />
          <TextEntry name="eyes" set={setInfo} info={info} value={eyes} />
          <TextEntry name="hair" set={setInfo} info={info} value={hair} />
          <TextEntry name="culture" set={setInfo} info={info} value={culture} />
          <TextEntry name="ethnicity" set={setInfo} info={info} value={ethnicity} />
          <TextEntry name="nationality" set={setInfo} info={info} value={nationality} />
          <Dropdown name="religion" set={setInfo} info={info} value={religion} />
          <Dropdown name="background" set={setInfo} info={info} value={background} />
          <TextEntry name="catalyst" set={setInfo} info={info} value={catalyst} />
          <Dropdown name="order" set={setInfo} info={info} value={order} />
          <Dropdown name="sin_vice" labelName="Sin / Vice" set={setInfo} info={info} value={sinVice} />
          <Dropdown name="virtue" set={setInfo} info={info} value={virtue} />
          <Counter name="heroPoints" labelName="Hero Points" set={setInfo} info={info} value={heroPoints} />
          <Counter name="trueFaith" labelName="True Faith" set={setInfo} info={info} value={trueFaith} />
          <Counter name="damnation" set={setInfo} info={info} value={damnation} />
        </ul>
      </div>
    </form>
  );
}