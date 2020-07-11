import React, { useState } from 'react';

import './characterInfo.css';

export default function CharacterInfo() {
  const [characterInfo, setCharacterInfo] = useState({
    name: '',
    culture: '',
    ethnicity: '',
    religion: '',
    nationality: '',
    description: '',
    height: '',
    weight: '',
    eyes: '',
    hair: '',
    catalyst: '',
    order: '',
    background: '',
    sinVice: '',
    virtue: '',
    heroPoints: 0,
    trueFaith: 0,
    damnation: 0
  });

  const handleCharacterInfoChange = (event) => { 
    event.persist();
    setCharacterInfo(characterInfo => ({
      ...characterInfo, [event.target.name]: event.target.value
    })
  )}

  const handleCharacterInfoHeroPointsPlusMinus = (modifier) => { 
    if (modifier === -1 && characterInfo.heroPoints <= 0)return;
    setCharacterInfo(characterInfo => ({
      ...characterInfo, heroPoints: characterInfo.heroPoints + modifier
    })
  )}

  const handleCharacterInfoTrueFaithPlusMinus = (modifier) => { 
    if (modifier === -1 && characterInfo.trueFaith <= 0) return;
    setCharacterInfo(characterInfo => ({
      ...characterInfo, trueFaith: characterInfo.trueFaith + modifier
    })
  )}

  const handleCharacterInfoDamnationPlusMinus = (modifier) => { 
    if (modifier === -1 && characterInfo.damnation <= 0) return;
    setCharacterInfo(characterInfo => ({
      ...characterInfo, damnation: characterInfo.damnation + modifier
    })
  )}

  return (
    <form method="post">

      <div>
        <ul>
          <li>
            <label htmlFor="name"><b>Name</b></label>
            <input 
              type="text" 
              placeholder="Character Name" 
              name="name" 
              value={characterInfo.name} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="culture"><b>Culture</b></label>
            <input 
              type="text" 
              placeholder="Culture" 
              name="culture" 
              value={characterInfo.culture} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="ethnicity"><b>Ethnicity</b></label>
            <input 
              type="text" 
              placeholder="Ethnicity" 
              name="ethnicity" 
              value={characterInfo.ethnicity} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="religion"><b>Religion</b></label>
            <input 
              type="text" 
              placeholder="Religion" 
              name="religion" 
              value={characterInfo.religion} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="nationality"><b>Nationality</b></label>
            <input 
              type="text" 
              placeholder="Nationality" 
              name="nationality" 
              value={characterInfo.nationality} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="description"><b>Description</b></label>
            <input 
              type="text" 
              placeholder="Description" 
              name="description" 
              value={characterInfo.description} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="height"><b>Height</b></label>
            <input 
              type="text" 
              placeholder="Height" 
              name="height" 
              value={characterInfo.height} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="weight"><b>Weight</b></label>
            <input 
              type="text" 
              placeholder="Weight" 
              name="weight" 
              value={characterInfo.weight} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="eyes"><b>Eyes</b></label>
            <input 
              type="text" 
              placeholder="Eyes" 
              name="eyes" 
              value={characterInfo.eyes} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="hair"><b>Hair</b></label>
            <input 
              type="text" 
              placeholder="Hair" 
              name="hair" 
              value={characterInfo.hair} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="catalyst"><b>Catalyst</b></label>
            <input 
              type="text" 
              placeholder="Catalyst" 
              name="catalyst" 
              value={characterInfo.catalyst} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="order"><b>Order</b></label>
            <input 
              type="text" 
              placeholder="Order" 
              name="order" 
              value={characterInfo.order} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="background"><b>Background</b></label>
            <input 
              type="text" 
              placeholder="Background" 
              name="background" 
              value={characterInfo.background} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="sinVice"><b>Sin(Vice)</b></label>
            <input 
              type="text" 
              placeholder="Sin(Vice)" 
              name="sinVice" 
              value={characterInfo.sinVice} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="virtue"><b>Virtue</b></label>
            <input 
              type="text" 
              placeholder="Virtue" 
              name="virtue" 
              value={characterInfo.virtue} 
              onChange={handleCharacterInfoChange}
              required />
          </li>

          <li>
            <label htmlFor="heroPoints"><b>Hero Points</b></label>
            <input 
              type="number" 
              name="heroPoints" 
              value={characterInfo.heroPoints} 
              onChange={handleCharacterInfoChange}
              required />
            <button 
              name="heroPoints" 
              onClick={() => handleCharacterInfoHeroPointsPlusMinus(1)}
              type='button'
            >+</button>
            <button 
              name="heroPoints" 
              onClick={() => handleCharacterInfoHeroPointsPlusMinus(-1)}
              type='button'
            >-</button>
          </li>

          <li>
            <label htmlFor="trueFaith"><b>True Faith</b></label>
            <input 
              type="number" 
              name="trueFaith" 
              value={characterInfo.trueFaith} 
              onChange={handleCharacterInfoChange}
              required />
            <button 
              onClick={() => handleCharacterInfoTrueFaithPlusMinus(1)}
              type='button'
            >+</button>
            <button 
              onClick={() => handleCharacterInfoTrueFaithPlusMinus(-1)}
              type='button'
            >-</button>
          </li>

          <li>
            <label htmlFor="damnation"><b>Damnation</b></label>
            <input 
              type="number" 
              name="damnation" 
              value={characterInfo.damnation}
              onChange={handleCharacterInfoChange}
              required />
            <button 
              onClick={() => handleCharacterInfoDamnationPlusMinus(1)}
              type='button'
            >+</button>
            <button 
              onClick={() => handleCharacterInfoDamnationPlusMinus(-1)}
              type='button'
            >-</button>
          </li>
        </ul>
      </div>
    </form>
  );
}