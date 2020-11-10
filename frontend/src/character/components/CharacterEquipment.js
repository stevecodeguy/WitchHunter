import React, { useState, useEffect } from 'react';

import AuthAPI from '../../utils/context/AuthApi';

import EquipmentArmor from './child_components/EquipmentArmor';
import EquipmentMoney from './child_components/EquipmentMoney';
import EquipmentGear from './child_components/EquipmentGear';
import EquipmentKits from './child_components/EquipmentKits';
import EquipmentKitItems from './child_components/EquipmentKitItems';
import EquipmentShots from './child_components/EquipmentShots';
import EquipmentVehicles from './child_components/EquipmentVehicles';
import EquipmentWeapons from './child_components/EquipmentWeapons';

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

  return (
    <>
      <h1>Equipment</h1>
      <EquipmentMoney money={money} />
      <EquipmentArmor armorList={armorList} />
      <EquipmentGear gearList={gearList} />
      <EquipmentKits kitList={kitList} />
      <EquipmentKitItems kitItems={kitItems} />
      <EquipmentShots shots={shots} />
      <EquipmentVehicles vehicleList={vehicleList} />
      <EquipmentWeapons weaponList={weaponList} />
    </>
  );
}
