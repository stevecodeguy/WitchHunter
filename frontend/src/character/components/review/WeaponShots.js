import React, { useContext, useEffect, useState } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function WeaponShots() {
  const { inventory } = useContext(CharacterContext);
  const [arrows, setArrows] = useState([]);
  const [bolts, setBolts] = useState([]);
  const [powder, setPowder] = useState([]);

  useEffect(() => {
    setArrows(() => {
      const arrowCount = inventory['Arrow']?.quantity ? inventory['Arrow'].quantity : 0;
      const arrowSlots = new Array(50).fill(1);
      for (let i = 0; i <= arrowCount - 1; i++) {
        arrowSlots[i] = 0;
      }
      return arrowSlots;
    });

    setBolts(() => {
      const boltCount = inventory['Bolt']?.quantity ? inventory['Bolt'].quantity : 0;
      const boltSlots = new Array(50).fill(1);
      for (let i = 0; i <= boltCount - 1; i++) {
        boltSlots[i] = 0;
      }
      return boltSlots;
    });

    setPowder(() => {
      const powderCount = inventory['Powder and Shot']?.quantity ? inventory['Powder and Shot'].quantity : 0;
      const powderSlots = new Array(15).fill(1);

      return [powderCount, powderSlots];
    });

  }, [inventory]);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>AMMUNITION</h3>
      </div>
      <div className="side-by-side shots">
        <h5>Arrows: </h5>
        <div className='squares'>
          {
            !!arrows ? arrows.map((arrow, index) => (
              arrow === 1 ? <div key={index + 'arrow'} className='square filled'></div> : <div key={index + 'arrow'} className='square'></div>
            )) : null
          }
        </div>
      </div>
      <hr />
      <div className="side-by-side shots">
        <h5>Bolts: </h5>
        <div className='squares'>
          {
            !!bolts ? bolts.map((bolt, index) => (
              bolt === 1 ? <div key={index + 'bolt'} className='square filled'></div> : <div key={index + 'bolt'} className='square'></div>
            )) : null
          }
        </div>
      </div>
      <hr />
      <div className="side-by-side shots powder">
        <h5>Powder & Shot: </h5>
        <p>/ {powder[0]}<b>lb(s)</b></p>
        <div className="side-by-side" >
          <div>
            <div className="squares">
              {
                !!powder[1] ? powder[1].map((shot, index) => (
                  shot === 1 ? <div key={index + 'shot'} className='square filled'></div> : <div key={index + 'shot'} className='square'></div>
                )) : null
              }
            </div>
            <p className="tiny">Blunderbus - 3 shots per lb</p>
            <p className="tiny">Blunderbus Pistols - 6 shots per lb</p>
            <p className="tiny">Pistols - 12 shots per lb</p>
            <p className="tiny">Muskets - 6 shots per lb</p>
          </div>
        </div>
      </div>
    </>
  );
}