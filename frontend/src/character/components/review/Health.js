import React, { useContext, useEffect, useState } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Health() {
  const { abilityScore } = useContext(CharacterContext);
  const [healthy, setHealthy] = useState([]);
  const [light, setLight] = useState([]);
  const [modHeavy, setModHeavy] = useState([]);
  const [dying, setDying] = useState([]);

  useEffect(() => {
    setHealthy(() => {
      const healthySlots = new Array(15).fill(1);
      for (let i = 0; i <= (+abilityScore["toughness"].score * 2); i++) {
        healthySlots[i] = 0;
      }
      return healthySlots;
    });

    setLight(() => {
      const lightSlots = new Array(10).fill(1);
      for (let i = 0; i <= (Math.round(+abilityScore["toughness"].score * 1.5)); i++) {
        lightSlots[i] = 0;
      }
      return lightSlots;
    });

    setModHeavy(() => {
      const modHeavySlots = new Array(10).fill(1);
      for (let i = 0; i <= +abilityScore["toughness"].score; i++) {
        modHeavySlots[i] = 0;
      }
      return modHeavySlots;
    });

    setDying(() => {
      const dyingSlots = new Array(10).fill(1);
      for (let i = 0; i <= (Math.round(+abilityScore["toughness"].score * 0.5)); i++) {
        dyingSlots[i] = 0;
      }
      return dyingSlots;
    });

  }, [abilityScore]);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>HEALTH TRACK</h3>
      </div>
      <table id="health-table">
        <thead>
          <th colSpan="2" >INJURY LEVEL</th>
          <th>EFFECT</th>
          <th>SCORE</th>
        </thead>
        <tbody>
          <tr>
            <td>HEALTHY</td>
            <td>Toughness x 2</td>
            <td>NONE</td>
            <td>
              <div className='squares'>
                {
                  !!healthy ? healthy.map(slot => (
                    slot === 1 ? <div className='square filled'></div> : <div className='square'></div>
                  )) : null
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>LIGHT</td>
            <td>Toughness x 1.5</td>
            <td>-1</td>
            <td>
              <div className='squares'>
                {
                  !!light ? light.map(slot => (
                    slot === 1 ? <div className='square filled'></div> : <div className='square'></div>
                  )) : null
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>MODERATE</td>
            <td>Toughness x 1</td>
            <td>-2</td>
            <td>
              <div className='squares'>
                {
                  !!modHeavy ? modHeavy.map(slot => (
                    slot === 1 ? <div className='square filled'></div> : <div className='square'></div>
                  )) : null
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>HEAVY</td>
            <td>Toughness x 1</td>
            <td>-3</td>
            <td>
              <div className='squares'>
                {
                  !!modHeavy ? modHeavy.map(slot => (
                    slot === 1 ? <div className='square filled'></div> : <div className='square'></div>
                  )) : null
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>DYING</td>
            <td>Toughness x 0.5</td>
            <td>-4</td>
            <td>
              <div className='squares'>
                {
                  !!dying ? dying.map(slot => (
                    slot === 1 ? <div className='square filled'></div> : <div className='square'></div>
                  )) : null
                }
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}