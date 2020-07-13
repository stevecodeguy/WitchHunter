import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../../utils/context/AuthContext';
import TextEntry from '../characterElements/TextEntry';
import TextAreaEntry from '../characterElements/TextAreaEntry';

import './characterInfo.css';

export default function CharacterInfo() {
  const [characterInfo, setCharacterInfo] = useState({
    religion: '',
    catalyst: '',
    order: {
      order: '',
      description: ''
    },
    background: {
      background: '',
      socialStanding: '',
      ability: '',
      abilityDescription: ''
    },
    sinVice: {
      sin_vice: '',
      benefit: ''
    },
    virtue: {
      virtue: '',
      description: ''
    },
    heroPoints: 0,
    trueFaith: 0,
    damnation: 0
  });
  const [religion, setReligion] = useState([]);
  const [order, setOrder] = useState([]);
  const [sinVice, setSinVice] = useState([]);
  const [virtue, setVirtue] = useState([]);
  const [background, setBackground] = useState([]);
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
        case 'background':
          setBackground(data);
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
      await fetchData('background');
    } else {
      return <Redirect to="/" />
    }
  }, [auth.jwt, fetchData]);

  const handleCharacterInfoChange = (event) => { 
    event.persist();
    if (event.target.name === 'sinVice'){
      setCharacterInfo(characterInfo => ({
        ...characterInfo, sinVice: {
          sin_vice: event.target.value,
          benefit: sinVice[event.target.selectedIndex -1].benefit
        }
      }))
    } else if (event.target.name === 'order'){
      setCharacterInfo(characterInfo => ({
        ...characterInfo, order: {
          order: event.target.value,
          description: order[event.target.selectedIndex -1].description
        }
      }))
    } else if (event.target.name === 'virtue'){
      setCharacterInfo(characterInfo => ({
        ...characterInfo, virtue: {
          virtue: event.target.value,
          description: virtue[event.target.selectedIndex -1].description
        }
      }))
    } else if (event.target.name === 'background'){
      setCharacterInfo(characterInfo => ({
        ...characterInfo, background: {
          background: event.target.value,
          socialStanding: background[event.target.selectedIndex -1].social_standing,
          ability: background[event.target.selectedIndex -1].ability,
          abilityDescription: background[event.target.selectedIndex -1].ability_description
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

  return (
    <form method="post">

      <div>
        <ul>
          <TextEntry name="name" labelName="Character Name" />
          <TextEntry name="culture" />
          <TextEntry name="ethnicity" />

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
          <TextEntry name="nationality" />
          <TextAreaEntry name="description" />
          <TextEntry name="height" />
          <TextEntry name="weight" />
          <TextEntry name="eyes" />
          <TextEntry name="hair" />

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
            <select 
              type="text" 
              name="order" 
              value={characterInfo.order.order} 
              onChange={handleCharacterInfoChange}
              required
            >
                <option value="" disabled selected>Choose Order</option>
                {
                  order.map(item => (
                    <option 
                      key={item.id} 
                      value={item.order}
                  >{item.order}</option>
                  ))
                }
            </select>
            <p>{characterInfo.order.description}</p>
          </li>

          <li>
            <label htmlFor="background"><b>Background</b></label>
            <select 
              name="background" 
              value={characterInfo.background.background} 
              onChange={handleCharacterInfoChange}
              required >
                <option value="" selected disabled>Choose Background</option>
                {
                  background.map(item => (
                    <option 
                      key={item.id} 
                      value={item.background}
                  >{item.background}</option>
                  ))
                }
            </select>
            <h5>Social Standing: </h5>
            <p>{characterInfo.background.socialStanding}</p>
            <h5>Ability: </h5>
            <p>{characterInfo.background.ability}</p>
            <h5>Ability Description: </h5>
            <p>{characterInfo.background.abilityDescription}</p>
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
            <select 
              name="virtue" 
              value={characterInfo.virtue.virtue} 
              onChange={handleCharacterInfoChange}
              required >
                <option value="" selected disabled>Choose Virtue</option>
                {
                  virtue.map(item => (
                    <option 
                      key={item.id} 
                      value={item.virtue}
                  >{item.virtue}</option>
                  ))
                }
            </select>
            <p>{characterInfo.virtue.description}</p>
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