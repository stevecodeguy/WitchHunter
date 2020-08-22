import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';
import TextEntry from '../components/child_components/TextEntry';
import TextAreaEntry from '../components/child_components/TextAreaEntry';
import Dropdown from '../components/child_components/Dropdown';
import Skill from '../components/child_components/Skill';

import '../css/characterInfo.css';

export default function CharacterInfo() {
  const [religion, setReligion] = useState([]);
  const [order, setOrder] = useState([]);
  const [sinVice, setSinVice] = useState([]);
  const [virtue, setVirtue] = useState([]);
  const [background, setBackground] = useState([]);

  const auth = useContext(AuthContext);
  let history = useHistory();

  const fetchData = useCallback((type) => {
    if (!!type) {
      fetch(`http://localhost:3000/info/${type}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + auth.jwt,
          'Content-type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
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
    }
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
          <TextAreaEntry name="description" />
          <TextEntry name="height" />
          <TextEntry name="weight" />
          <TextEntry name="eyes" />
          <TextEntry name="hair" />
          <TextEntry name="culture" />
          <TextEntry name="ethnicity" />
          <TextEntry name="nationality" />
          <Dropdown name="religion" data={religion}/>
          <Dropdown name="background" data={background} />
          <TextEntry name="catalyst" />
          
          <Dropdown name="order" data={order} />
          <Dropdown name="sin_vice" data={sinVice} />
          <Dropdown name="virtue" data={virtue} /> 
          <Skill name="heroPoints" labelName="Hero Points" /> 
          <Skill name="trueFaith" labelName="True Faith" /> 
          <Skill name="damnation" /> 
        </ul>
        <button
          onClick={() => {
            history.push('/character/new/abilities');
          }}
        >Next</button> 
      </div>
    </form>
  );
}