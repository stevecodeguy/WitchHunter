import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Order() {
  const { info } = useContext(CharacterContext);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>TALENTS</h3>
      </div>
      <div id="talents">
        <div className="side-by-side title">
          <h5>ORDER</h5>
          <h5>BENEFIT</h5>
        </div>
        <div className='side-by-side'>
          {
            Object.keys(info).length > 0 ?
              <>
                <h6>{info.order.order}</h6>
                <p>{info.order.benefit}</p>
              </>
              : null
          }
        </div>
      </div>
    </>
  );
}