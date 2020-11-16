import React, { useState, useEffect } from 'react';

import AuthAPI from '../../utils/context/AuthApi';

import Armor from '../components/equipment/Armor';
import Money from '../components/equipment/Money';
import Gear from '../components/equipment/Gear';
import Kits from '../components/equipment/Kits';
import KitItems from '../components/equipment/KitItems';
import Vehicles from '../components/equipment/Vehicles';
import Weapons from '../components/equipment/Weapons';
import Inventory from '../components/equipment/Inventory';

import '../css/characterEquipment.css';

export default function CharacterEquipment() {
  const [moneyList, setMoneyList] = useState([]);
  const [armorList, setArmorList] = useState([]);
  const [gearList, setGearList] = useState([]);
  const [kitList, setKitList] = useState([]);
  const [kitItems, setKitItems] = useState([]);
  const [shots, setShots] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [weaponList, setWeaponList] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const [inventory, setInventory] = useState({});
  const [selected, setSelected] = useState([]);
  const [rowClass, setRowClass] = useState([]);
  const [characterMoney, setCharacterMoney] = useState({
    pounds: {amount: 0, abbreviation: '£'},
    crowns: {amount: 0, abbreviation: 'c'},
    shilling: {amount: 0, abbreviation: 's'},
    penny: {amount: 0, abbreviation: 'd'},
    farthing: {amount: 0, abbreviation: 'f'}
  });

  useEffect(() => {
    const getEquipment = async () => {
      try {
        // Get Money from database
        const moneyData = await AuthAPI.get(`/items/money`);
        setMoneyList(moneyData.data);

        // Get Armor from database
        const armorData = await AuthAPI.get(`/items/armor`);
        setArmorList(armorData.data);

        // Get Gear from database
        const gearData = await AuthAPI.get(`/items/gear`);
        setGearList(gearData.data);

        // Get Kits from database
        const kitsData = await AuthAPI.get(`/items/kits`);
        setKitList(kitsData.data);

        // Get Kit Items from database
        const kitItemsData = await AuthAPI.get(`/items/kit_items`);
        setKitItems(kitItemsData.data);

        // Get Shots from database
        const shotsData = await AuthAPI.get(`/items/shots`);
        setShots(shotsData.data);

        // Get Vehicles from database
        const vehicleData = await AuthAPI.get(`/items/vehicles`);
        setVehicleList(vehicleData.data);

        // Get Weapons from database
        const weaponData = await AuthAPI.get(`/items/weapons`);
        setWeaponList(weaponData.data);
      } catch (error) {
        console.log(`Error getting Skills: ${error}`);
      }
    }

    getEquipment();
  }, []);

  useEffect(() => {
    //set default category
    !!categorySelected.main ? null : setCategorySelected(prev => { return { ...prev, main: 'Kits' } });
  }, [categorySelected, setCategorySelected]);

  const SwitchEquipment = () => {
    switch (categorySelected.main) {
      case 'Armor':
        return <Armor
          armorList={armorList}
          setSelected={setSelected}
          rowClass={rowClass}
          setRowClass={setRowClass}
        />
      case 'Gear':
        return <Gear
          gearList={gearList}
          vehicleList={vehicleList}
          setSelected={setSelected}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          rowClass={rowClass}
          setRowClass={setRowClass}
        />
      case 'Kits':
        return (
          <>
            <Kits
              kitList={kitList}
              setSelected={setSelected}
              rowClass={rowClass}
              setRowClass={setRowClass}
            />
            <KitItems kitItems={kitItems} />
          </>
        )
      case 'Weapons':
        return (
          <>
            <Weapons
              weaponList={weaponList}
              shots={shots}
              setSelected={setSelected}
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              rowClass={rowClass}
              setRowClass={setRowClass}
            />
          </>
        )
      default:
        return null;
    }
  }

  const buyItems = (amount) => {
    if (!!selected && !!selected.item) {
      setInventory(prev => {
        let newInventory = {
          ...prev,
          [selected.item]: {
            weightEach: !!selected.weight_lb ? selected.weight_lb : null,
            weight: !!selected.weight_lb ?
              (selected.weight_lb * (!!prev[selected.item] ? (prev[selected.item].quantity + amount) : amount))
              : null,
            quantity: !!prev[selected.item] ? (prev[selected.item].quantity + amount) : null || amount
          }
        }
        return newInventory;
      });
    }
  }


  return (
    <>
      <h1>Equipment</h1>
      <Money
        moneyList={moneyList}
        characterMoney={characterMoney}
        setCharacterMoney={setCharacterMoney}
      />
      <Inventory
        inventory={inventory}
        rowClass={rowClass}
      />
      <select
        name="equipment"
        id="equipment_dropdown"
        value={categorySelected.main}
        onChange={(event) => {
          setSelected([]);
          setRowClass([]);
          setCategorySelected({ main: event.target.value });
        }}
      >
        <option value="" disabled>Select Equipment Type</option>
        <option key="kits" value="Kits">Kits</option>
        <option key="armor" value="Armor">Armor</option>
        <option key="gear" value="Gear">Gear</option>
        <option key="weapons" value="Weapons">Weapons</option>
        <option key="vehicles" value="Vehicles">Vehicles</option>
      </select>
      <button onClick={() => buyItems(1)}>Buy item</button>
      <button onClick={() => buyItems(5)}>Buy 5 items</button>
      <button onClick={() => buyItems(10)}>Buy 10 items</button>
      <SwitchEquipment />
    </>
  );
}
