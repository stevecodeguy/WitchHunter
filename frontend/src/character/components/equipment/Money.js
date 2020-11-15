import React from 'react';

import '../../css/tables.css';

export default function Money({ money }) {
  return (
    <table className="info">
      <thead>
        <tr>
          <th>Type</th>
          <th>Abbr.</th>
          <th>Exchange</th>
        </tr>
      </thead>
      <tbody>
        { money.map((m) => (
          <tr key={m.id + 'money'}>
            <td>{m.coin}</td>
            <td>{m.abbreviation}</td>
            <td>{m.exchange_farthing}f / {(m.exchange_farthing / 960).toFixed(3)}£</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}