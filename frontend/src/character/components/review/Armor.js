import React, { useContext, useEffect, useState } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Armor() {
  const { inventory } = useContext(CharacterContext);
  const [foundArmor, setFoundArmor] = useState(false);

  useEffect(() => {
    setFoundArmor(!!Object.values(inventory).find(inv => inv.category === 'Armor'));
  }, [inventory]);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>ARMOR</h3>
      </div>
      {
        foundArmor ?
          [...Object.entries(inventory)].map((inv, index) => {
            const invValues = Object.values(inv[1])

            return (
              <div key={index + 'Armor'}>
                {
                  invValues[1] === 'Armor' ?
                    <div key={inv[0]}>
                      <div className="side-by-side">
                        <div className="together">
                          <h5>Armor:</h5>
                          <p>{inv[0]}</p>
                        </div>
                        <div className="together">
                          <h5>AV:</h5>
                          <p>{inv[1].armor_value}</p>
                        </div>
                        <div className="together">
                          <h5>AP: </h5>
                          <p>{+inv[1].agility_penalty}</p>
                        </div>
                        <div className="together">
                          <h5>MP:</h5>
                          <p>{+inv[1].movement_penalty}</p>
                        </div>
                        <div className="together">
                          <h5>Weight:</h5>
                          <p>{inv[1].weight}</p>
                        </div>
                      </div>
                      <hr />
                    </div>
                    : null
                }
              </div>
            )
          })
          :
          <div>
            <div className="side-by-side">
              <div className="together">
                <h5>Armor:</h5>
                <p>None</p>
              </div>
              <div className="together">
                <h5>AV:</h5>
                <p>-</p>
              </div>
              <div className="together">
                <h5>AP: </h5>
                <p>-</p>
              </div>
              <div className="together">
                <h5>MP:</h5>
                <p>-</p>
              </div>
              <div className="together">
                <h5>Weight:</h5>
                <p>-</p>
              </div>
            </div>
            <hr />
          </div>
      }
    </>
  );
}