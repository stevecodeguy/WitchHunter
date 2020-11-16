import React from 'react';

import '../../css/tables.css';

export default function Money({ moneyList, characterMoney, setCharacterMoney }) {
  let currentMoney = Object.entries(characterMoney);

  return (
    <>
      <table className="info">
        <thead>
          <tr>
            <th>Type</th>
            <th>Abbr.</th>
            <th>Exchange</th>
          </tr>
        </thead>
        <tbody>
          {moneyList.map((m) => (
            <tr key={m.id + 'money'}>
              <td>{m.coin}</td>
              <td>{m.abbreviation}</td>
              <td>{m.exchange_farthing}f / {(m.exchange_farthing / 960).toFixed(3)}£</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => {
        setCharacterMoney(prev => {
          return {
            ...prev,
            pounds: {
              ...prev.pounds,
              amount: Math.floor(Math.random() * Math.floor(10)) + 1
            }
          };
        });
      }}>Roll for Starting Money</button>
      <table className="info">
      <caption>Starting Money:</caption>
        <thead>
          <tr>
            <td className="tableCenterText">Coin</td>
            <td>#</td>
          </tr>
        </thead>
        <tbody>
          {currentMoney.map(coins => (
            <tr>
              <td className="tableCenterText">{coins[1].abbreviation}</td>
              <td>{coins[1].amount}</td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}