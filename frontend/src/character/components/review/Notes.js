import React from 'react';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Notes() {
  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>NOTES</h3>
      </div>
      <div className='blank-space-fill'></div>
    </>
  );
}