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
      const arrowCount = !!inventory['Arrow'].quantity ? inventory['Arrow'].quantity : 0;
      const arrowSlots = new Array(50).fill(1);
      for (let i = 0; i <= arrowCount; i++) {
        arrowSlots[i] = 0;
      }
      return arrowSlots;
    });

    setBolts(() => {
      const boltCount = !!inventory['Bolt'].quantity ? inventory['Bolt'].quantity : 0;
      const boltSlots = new Array(50).fill(1);
      for (let i = 0; i <= boltCount; i++) {
        boltSlots[i] = 0;
      }
      return boltSlots;
    });

    setPowder(() => {
      const powderCount = !!inventory['Powder and Shot'].quantity ? inventory['Powder and Shot'].quantity : 0;
      const powderSlots = new Array(12).fill(1);

      return [powderCount, powderSlots];
    });

  }, [inventory]);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>SHOTS</h3>
      </div>
      <div className="side-by-side shots">
        <h5>Arrows: </h5>
        <div className='squares'>
          {
            arrows.map(arrow => (
              arrow === 1 ? <div className='square filled'></div> : <div className='square'></div>
            ))
          }
        </div>
      </div>
      <hr />
      <div className="side-by-side shots">
        <h5>Bolts: </h5>
        <div className='squares'>
          {
            bolts.map(bolt => (
              bolt === 1 ? <div className='square filled'></div> : <div className='square'></div>
            ))
          }
        </div>
      </div>
      <hr />
      {/* <div className="side-by-side shots">
        <h5>Powder & Shot: </h5>
        <p>&nbsp;{powder[0]} lb(s)</p>
        <div>
          <p className="tiny">Blunderbus - 3 shots per lb</p>
          <p className="tiny">Blunderbus Pistols - 6 shots per lb</p>
          <p className="tiny">Pistols - 12 shots per lb</p>
          <p className="tiny">Muskets - 6 shots per lb</p>
          <div className='squares'>
            {
              powder[1].map(shot => (
                shot === 1 ? <div className='square filled'></div> : <div className='square'></div>
              ))
            }
          </div>
        </div>
      </div> */}
    </>
  );
}