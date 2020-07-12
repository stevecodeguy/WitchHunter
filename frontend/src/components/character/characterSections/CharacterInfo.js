import React, { useState, useContext, useCallback, useEffect } from 'react';

import { AuthContext } from '../../../utils/context/AuthContext';

import './characterInfo.css';
import { Redirect } from 'react-router-dom';

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
    sinVice: {
      sin_vice: '',
      benefit: ''
    },
    virtue: '',
    heroPoints: 0,
    trueFaith: 0,
    damnation: 0
  });
  const [religion, setReligion] = useState([]);
  const [order, setOrder] = useState([]);
  const [sinVice, setSinVice] = useState([]);
  const [virtue, setVirtue] = useState([]);
  const auth = useContext(AuthContext);

  const fetchData = useCallback((type) => {
    fetch(`http://localhost:3000/info/${type}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + auth.jwt,
        'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(async (data) => {
      switch(type){
        case 'religion':
          setReligion(data);
          break;
        case 'order':
          setOrder(data);
          break;
        case 'sinVice':
          setSinVice(data);
          break;
        case 'virtue':
          setVirtue(data);
          break;
        default:
          console.log('Incorrect dropdown request');
      }
    })
    .catch(error => console.log(error));
  }, [auth.jwt]);

  const getControlsData = useCallback( async (type) => {
    if (!!auth.jwt) {
      await fetchData('religion');
      await fetchData('order');
      await fetchData('sinVice');
      await fetchData('virtue');
    } else {
      return <Redirect to="/" />
    }
  }, [auth.jwt, fetchData]);

  // const updateDescription = useCallback(() => {
  //   console.log('test')
  // });

  const handleCharacterInfoChange = (event) => { 
    event.persist();
    if (event.target.name === 'sinVice'){
      setCharacterInfo(characterInfo => ({
        ...characterInfo, sinVice: {
          sin_vice: event.target.value,
          benefit: sinVice[event.target.selectedIndex -1].benefit
        }
      }))
    } else {
      setCharacterInfo(characterInfo => ({
        ...characterInfo, [event.target.name]: event.target.value
      }))
    }
  }

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

  useEffect(() => {
    getControlsData();
  }, [getControlsData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   updateDescription();
  // }, [updateDescription]);

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
            <select 
              type="text" 
              name="religion" 
              value={characterInfo.religion} 
              onChange={handleCharacterInfoChange}
              required
            >
                <option value="" disabled selected>Choose Religion</option>
                {
                  religion.map(item => (
                    <option 
                      key={item.id} 
                      value={item.religion}
                  >{item.religion}</option>
                  ))
                }
            </select>
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
            <textarea 
              placeholder="Description" 
              name="description" 
              rows="6"
              cols="100"
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
            <select 
              type="text" 
              placeholder="Background" 
              name="background" 
              value={characterInfo.background} 
              onChange={handleCharacterInfoChange}
              required>
              <option value="none" selected disabled>Choose background</option>
              {
                console.log('To do backgrounds...')
              }
            </select>
          </li>

          <li>
            <label htmlFor="sinVice"><b>Sin(Vice)</b></label>
            <select 
              name="sinVice" 
              value={characterInfo.sinVice.sin_vise} 
              onChange={handleCharacterInfoChange}
              required >
                <option value="" selected disabled>Choose Sin / Vice</option>
                {
                  sinVice.map(item => (
                    <option 
                      key={item.id} 
                      value={item.sin_vice}
                  >{item.sin_vice}</option>
                  ))
                }
            </select>
            <p>{characterInfo.sinVice.benefit}</p>
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
        <button
          onClick={console.log('Temp - next screen')}
        >Next</button>
      </div>
    </form>
  );
}