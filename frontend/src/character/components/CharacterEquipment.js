import React, { useState, useEffect } from 'react';

import AuthAPI from '../../utils/context/AuthApi';

import EquipmentArmor from './child_components/EquipmentArmor';

export default function CharacterEquipment() {
  const [money, setMoney] = useState({});
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
        setMoney(moneyObject => {
          for (const key in moneyData.data) {
            moneyObject = {
              ...moneyObject,
              [moneyData.data[key].coin]: {
                abbreviation: moneyData.data[key].abbreviation,
                exchange: moneyData.data[key].exchange_farthing,
                type: moneyData.data[key].type
              }
            }
          }
          return moneyObject;
        });

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
      <EquipmentArmor armorList={armorList} />
    </>
  );
}
