import React, { useEffect } from 'react';

import '../../css/tables.css';

export default function Money({ moneyList, characterMoney, setCharacterMoney, inventoryCount }) {
  let currentMoney = Object.entries(characterMoney);

  useEffect(() => {
    if (!localStorage.getItem('character_money')) {
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
    };
  }, [setCharacterMoney])

  return (
    <>
      <table className="info">
        <thead>
          <tr>
            <th rowSpan="2">Type</th>
            <th rowSpan="2">Abbr.</th>
            <th colSpan="5">Exchange</th>
          </tr>
          <tr>
            <th>£</th>
            <th>c</th>
            <th>s</th>
            <th>d</th>
            <th>f</th>
          </tr>
        </thead>
        <tbody>
          {moneyList.map((m) => (
            <tr key={m.id + 'money'}>
              <td>{m.coin}</td>
              <td>{m.abbreviation}</td>
              <td>{m.exchange_pound}</td>
              <td>{m.exchange_crown}</td>
              <td>{m.exchange_shilling}</td>
              <td>{m.exchange_penny}</td>
              <td>{m.exchange_farthing}</td>
            </tr>
          ))}
        </tbody>
      </table>

      { // Check if there is any Inventory purchased or if money has been saved to localStorage. If so, hide the money reroll button.
        (inventoryCount === 0 && !localStorage.getItem('character_money') ) ? (
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
          }}>Reroll Starting Money</button>) : null}
      <table className="calculated">
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
              <td><b>{coins[1].amount}</b></td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </>
  );
}