import React, { useState, useEffect } from 'react';

import AuthAPI from '../../utils/context/AuthApi';

import EquipmentArmor from '../components/equipment/Armor';
import EquipmentMoney from '../components/equipment/Money';
import EquipmentGear from '../components/equipment/Gear';
import EquipmentKits from '../components/equipment/Kits';
import EquipmentKitItems from '../components/equipment/KitItems';
import EquipmentVehicles from '../components/equipment/Vehicles';
import EquipmentWeapons from '../components/equipment/Weapons';

import '../css/characterEquipment.css';

export default function CharacterEquipment() {
  const [money, setMoney] = useState([]);
  const [armorList, setArmorList] = useState([]);
  const [gearList, setGearList] = useState([]);
  const [kitList, setKitList] = useState([]);
  const [kitItems, setKitItems] = useState([]);
  const [shots, setShots] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [weaponList, setWeaponList] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  // const [inventory, setSetInventory] = useState([]);
  const [selected, setSelected] = useState([]);
  const [rowClass, setRowClass] = useState([]);

  useEffect(() => {
    const getEquipment = async () => {
      try {
        // Get Money from database
        const moneyData = await AuthAPI.get(`/items/money`);
        setMoney(moneyData.data);

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
        return <EquipmentArmor
          armorList={armorList}
          setSelected={setSelected}
          rowClass={rowClass}
          setRowClass={setRowClass}
        />
      case 'Gear':
        return <EquipmentGear
          gearList={gearList}
          setSelected={setSelected}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          rowClass={rowClass}
          setRowClass={setRowClass}
        />
      case 'Kits':
        return (
          <>
            <EquipmentKits
              kitList={kitList}
              setSelected={setSelected}
              rowClass={rowClass}
              setRowClass={setRowClass}
            />
            <EquipmentKitItems kitItems={kitItems} />
          </>
        )
      case 'Vehicles':
        return <EquipmentVehicles
          vehicleList={vehicleList}
          setSelected={setSelected}
          rowClass={rowClass}
          setRowClass={setRowClass}
        />
      case 'Weapons':
        return (
          <>
            <EquipmentWeapons
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

  return (
    <>
      <h1>Equipment</h1>
      <EquipmentMoney money={money} />
      <select
        name="equipment"
        id="equipment_dropdown"
        value={categorySelected.main}
        onChange={(event) => {
          setSelected([]);
          setRowClass([]);
          setCategorySelected({main: event.target.value});
        }}
      >
        <option value="" disabled>Select Equipment Type</option>
        <option key="kits" value="Kits">Kits</option>
        <option key="armor" value="Armor">Armor</option>
        <option key="gear" value="Gear">Gear</option>
        <option key="weapons" value="Weapons">Weapons</option>
        <option key="vehicles" value="Vehicles">Vehicles</option>
      </select>
      <button onClick={() => console.log('hi')}>Buy item</button>
      <SwitchEquipment />
    </>
  );
}
