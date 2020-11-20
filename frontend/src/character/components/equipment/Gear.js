import React, { useState, useEffect } from 'react';

import { selectTableRow } from '../../../utils/helpers/TableHelpers';

import '../../css/tables.css';
import Vehicles from './Vehicles';

export default function Gear({ gearList, vehicleList, setSelected, buyItems, rowClass, setRowClass, categorySelected, setCategorySelected }) {
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    //set default sub category
    !!categorySelected.sub ? null : setCategorySelected(prev => { return { ...prev, sub: 'Animals, Tack, and Vehicles' } });
  }, [categorySelected, setCategorySelected]);

  useEffect(() => {
    // Corrects table id selection to id
    let gearCounts = {};
    let lastCount = 0;
    for (let i = 1; i < gearList.length; i++) {
      if (gearList[i].category !== gearList[i - 1].category) {
        gearCounts = {
          ...gearCounts,
          [gearList[i - 1].category]: lastCount
        }
        lastCount = i
      }
      if (i === gearList.length - 1) {
        gearCounts = {
          ...gearCounts,
          [gearList[i].category]: lastCount
        }
      }
    }

    setCategoryCounts(gearCounts);
  }, [gearList]);

  return (
    <div>
      <select
        name="gear"
        id="gear_dropdown"
        value={categorySelected.sub}
        onChange={(event) => {
          setSelected([]);
          setRowClass([]);
          setCategorySelected(prev => { return { ...prev, sub: event.target.value } });
        }}
      >
        <option key="animals" value="Animals, Tack, and Vehicles">Animals, Tack, and Vehicles</option>
        <option key="clothing" value="Clothing and Accessories">Clothing and Accessories</option>
        <option key="equipment" value="Equipment">Equipment</option>
        <option key="food" value="Food & Drink">Food & Drink</option>
        <option key="lodging" value="Lodging - Accomodations">Lodging - Accomodations</option>
        <option key="services" value="Services">Services</option>
        <option key="tools" value="Tools">Tools</option>
      </select>
      <table>
        <thead>
          <tr>
            <th style={{ display: "none" }}>Id</th>
            <th>Category</th>
            <th>Item</th>
            <th>Cost</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {gearList.map(gear =>
            gear.category === categorySelected.sub ? (
              <tr
                key={gear.id}
                onMouseDown={(event) => {
                  setSelected(gearList.find(gear => gear.id === (event.target.parentNode.cells[0].innerText * 1)));
                  setRowClass({ [gear.id - 1]: 'selected' });
                }}
                onDoubleClick={() => buyItems(1)}
                className={rowClass[gear.id - 1]}
              >
                <td style={{ display: "none" }}>{gear.id}</td>
                <td>{gear.category}</td>
                <td>{gear.item}</td>
                <td>
                  {gear.cost_pounds > 0 ? '£' + gear.cost_pounds + ' ' : null}
                  {gear.cost_crowns > 0 ? gear.cost_crowns + 'c ' : null}
                  {gear.cost_shilling > 0 ? gear.cost_shilling + 's ' : null}
                  {gear.cost_penny > 0 ? gear.cost_penny + 'd ' : null}
                  {gear.cost_farthing > 0 ? gear.cost_farthing + 'f ' : null}
                  {(gear.cost_pounds === 0 || !gear.cost_pounds) &&
                    (gear.cost_crowns === 0 || !gear.cost_crowns) &&
                    (gear.cost_shilling === 0 || !gear.cost_shilling) &&
                    (gear.cost_penny === 0 || !gear.cost_penny) &&
                    (gear.cost_farthing === 0 || !gear.cost_farthing) ? '-' : null}
                </td>
                <td>{gear.weight_lb}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {categorySelected.sub === 'Animals, Tack, and Vehicles' ? <Vehicles vehicleList={vehicleList} /> : null}
    </div >
  );
}