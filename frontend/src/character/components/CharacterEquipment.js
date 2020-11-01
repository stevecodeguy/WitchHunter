import React, { useState } from 'react';

import { AuthAPI } from '../../utils/context/AuthApi';

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
    const getEquipment = () => {
      try {
        const getMoney = await AuthAPI.get();
      } catch(error) {
        console.log(`Error getting Skills: ${error}`);
      }
    }
    
    getEquipment();
  });

  return (
    <h1>Equipment</h1>
  );
}
