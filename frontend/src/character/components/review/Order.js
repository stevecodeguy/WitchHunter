import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Order() {
  const { info } = useContext(CharacterContext);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>ORDER</h3>
      </div>
      {
        Object.keys(info).length > 0 ?
          <div id="order">
            <h5>{info.order.order}</h5>

            <h5>BENEFITS</h5>
            <div className='side-by-side'>
              <ul>
                {
                  Object.entries(info?.order?.benefits).map(benefit => (
                    <li key={benefit[1].id}>{benefit[1].benefit}</li>
                  ))
                }
              </ul>
            </div>
          </div>
          : null
      }
    </>
  );
}