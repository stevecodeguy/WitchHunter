import React, { useEffect } from 'react';

import '../../css/tables.css';

export default function Money({ moneyList, characterMoney, setCharacterMoney }) {
  let currentMoney = Object.entries(characterMoney);

  useEffect(() => {
    setCharacterMoney(prev => {
      let generatedMoney = Math.floor(Math.random() * Math.floor(10)) + 1;
      return {
        ...prev,
        pounds: {
          ...prev.pounds,
          amount: generatedMoney
        },
        singleTotal: generatedMoney * 960
      };
    });
  }, [setCharacterMoney])

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
          let generatedMoney = Math.floor(Math.random() * Math.floor(10)) + 1;
          return {
            ...prev,
            pounds: {
              ...prev.pounds,
              amount: generatedMoney
            },
            singleTotal: generatedMoney * 960
          };
        });
      }}>Reroll Starting Money</button>
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
            <tr key={coins[0]}>
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