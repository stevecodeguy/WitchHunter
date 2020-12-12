import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';

import Armor from '../components/equipment/Armor';
import Money from '../components/equipment/Money';
import Gear from '../components/equipment/Gear';
import Kits from '../components/equipment/Kits';
import KitItems from '../components/equipment/KitItems';
import Weapons from '../components/equipment/Weapons';
import Inventory from '../components/equipment/Inventory';

import { CharacterContext } from '../../utils/context/CharacterContext';

import { moneyTransfer } from '../../utils/helpers/MoneyHelpers';

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
  const [selected, setSelected] = useState([]);
  const [rowClass, setRowClass] = useState({});
  const [inventoryCount, setInventoryCount] = useState(0);

  const auth = useContext(AuthContext);
  const {
    abilityScore,
    carryLimit,
    characterMoney,
    inventory,
    setCarryLimit,
    setCharacterMoney,
    setInventory
  } = useContext(CharacterContext);

  let history = useHistory();

  useEffect(() => {
    const getEquipment = async () => {
      try {
        // Get Money from database
        const moneyData = await AuthAPI.get(`/items/money`);
        setMoneyList(moneyData.data);

        // Get Armor from database
        const armorData = await AuthAPI.get(`/items/armor`);
        setArmorList(armorData.data);

        // Get Carry Lift Shove table from database
        const carryData = await AuthAPI.get(`/characters/carry_lift_shove/${abilityScore.strength.score + abilityScore.toughness.score}`);
        setCarryLimit(carryData.data.carry_lbs);

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
  }, [abilityScore.strength.score, abilityScore.toughness.score, setCarryLimit]);

  // Function to purchase items or kits.
  const buyItems = (event, amount) => {
    event.preventDefault();
    if (!!selected && (!!selected.item || !!selected.kit)) {
      const cost = {
        pounds: !!selected.cost_pounds ? selected.cost_pounds : 0,
        crowns: !!selected.cost_crowns ? selected.cost_crowns : 0,
        shillings: !!selected.cost_shilling ? selected.cost_shilling : 0,
        pennies: !!selected.cost_penny ? selected.cost_penny : 0,
        farthings: !!selected.cost_farthing ? selected.cost_farthing : 0
      };

      const moneyResult = moneyTransfer(characterMoney, cost, 'buy');

      if (moneyResult) {
        setCharacterMoney(moneyResult);

        if (categorySelected.main === 'Kits') {
          let kitInventory = {};

          for (const index in kitItems) {
            if (kitItems[index].kit === selected.kit) {
              kitInventory = {
                ...kitInventory,
                [kitItems[index].item]: {
                  id: !!kitItems[index].fk_item_id ? kitItems[index].fk_item_id : null,
                  category: !!kitItems[index].category ? kitItems[index].category : null,
                  weightEach: !!kitItems[index].weight_lb ? kitItems[index].weight_lb : 0,
                  weight: (!!kitItems[index].weight_lb && !!kitItems[index].quantity) ?
                    Math.round(kitItems[index].weight_lb * (!!kitItems[index].quantity ? kitItems[index].quantity : 0))
                    : 0,
                  quantity: !!kitItems[index].quantity ? kitItems[index].quantity : 0,
                  cost_pounds: !!kitItems[index].cost_pounds ?
                    (kitItems[index].cost_pounds * kitItems[index].quantity)
                    : 0,
                  cost_crowns: !!kitItems[index].cost_crowns ?
                    (kitItems[index].cost_crowns * kitItems[index].quantity)
                    : 0,
                  cost_shilling: !!kitItems[index].cost_shilling ?
                    (kitItems[index].cost_shilling * kitItems[index].quantity)
                    : 0,
                  cost_penny: !!kitItems[index].cost_penny ?
                    (kitItems[index].cost_penny * kitItems[index].quantity)
                    : 0,
                  cost_farthing: !!kitItems[index].cost_farthing ?
                    (kitItems[index].cost_farthing * kitItems[index].quantity)
                    : 0,
                  complexity: !!kitItems[index].complexity ? kitItems[index].complexity : 0,
                  complexity_thrown: !!kitItems[index].complexity_thrown ? kitItems[index].complexity_thrown : 0,
                  damage_modifier: !!kitItems[index].damage_modifier ? kitItems[index].damage_modifier : 0,
                  range: !!kitItems[index].range ? kitItems[index].range : '-',
                  size: !!kitItems[index].size ? kitItems[index].size : null,
                  reload: !!kitItems[index].reload ? kitItems[index].reload : '-',
                  armor_value: !!kitItems[index].armor_value ? kitItems[index].armor_value : '-',
                  agility_penalty: !!kitItems[index].agility_penalty ? +kitItems[index].agility_penalty : 0,
                  movement_penalty: !!kitItems[index].movement_penalty ? +kitItems[index].movement_penalty : 0,
                  fromKit: !!kitItems[index].kit ? kitItems[index].kit : false
                }
              }
            }
          }

          setInventory(prev => {
            let newInventory = {
              ...prev,
              ...kitInventory
            }
            return newInventory;
          });

        } else {

          setInventory(prev => {
            let newInventory = {
              ...prev,
              [selected.item]: {
                id: !!selected.id ? selected.id : null,
                category: !!selected.category ? selected.category : null,
                weightEach: !!selected.weight_lb ? selected.weight_lb : 0,
                weight: !!selected.weight_lb ?
                  Math.round(selected.weight_lb * (!!prev[selected.item] ? (prev[selected.item].quantity + amount) : amount))
                  : 0,
                quantity: !!prev[selected.item] ? (prev[selected.item].quantity + amount) : null || amount,
                cost_pounds: !!selected.cost_pounds ?
                  (selected.cost_pounds * (!!prev[selected.item] ? (prev[selected.item].quantity + amount) : amount))
                  : 0,
                cost_crowns: !!selected.cost_crowns ?
                  (selected.cost_crowns * (!!prev[selected.item] ? (prev[selected.item].quantity + amount) : amount))
                  : 0,
                cost_shilling: !!selected.cost_shilling ?
                  (selected.cost_shilling * (!!prev[selected.item] ? (prev[selected.item].quantity + amount) : amount))
                  : 0,
                cost_penny: !!selected.cost_penny ?
                  (selected.cost_penny * (!!prev[selected.item] ? (prev[selected.item].quantity + amount) : amount))
                  : 0,
                cost_farthing: !!selected.cost_farthing ?
                  (selected.cost_farthing * (!!prev[selected.item] ? (prev[selected.item].quantity + amount) : amount))
                  : 0,
                complexity: !!selected.complexity ? selected.complexity : 0,
                complexity_thrown: !!selected.complexity_thrown ? selected.complexity_thrown : 0,
                damage_modifier: !!selected.damage_modifier ? selected.damage_modifier : 0,
                range: !!selected.range ? selected.range : '-',
                size: !!selected.size ? selected.size : null,
                reload: !!selected.reload ? selected.reload : '-',
                armor_value: !!selected.armor_value ? selected.armor_value : '-',
                agility_penalty: !!selected.agility_penalty ? +selected.agility_penalty : 0,
                movement_penalty: !!selected.movement_penalty ? +selected.movement_penalty : 0,
              }
            }
            return newInventory;
          });
        }
      }
    }
  }

  // Set default category
  useEffect(() => {
    !!categorySelected.main ? null : setCategorySelected(prev => { return { ...prev, main: 'Kits' } });
  }, [categorySelected, setCategorySelected]);

  // Set inventory count when inventory changes, delete localStorage for inventory if 0 items.
  useEffect(() => {
    setInventoryCount(Object.keys(inventory).length);
    if (Object.keys(inventory).length === 0) {
      localStorage.removeItem('character_money');
    }
  }, [setInventoryCount, inventory])

  // Switch to render equipment.
  const SwitchEquipment = () => {
    switch (categorySelected.main) {
      case 'Armor':
        return <Armor
          armorList={armorList}
          setSelected={setSelected}
          rowClass={rowClass}
          setRowClass={setRowClass}
          buyItems={buyItems}
        />
      case 'Gear':
        return <Gear
          gearList={gearList}
          vehicleList={vehicleList}
          selected={selected}
          setSelected={setSelected}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          rowClass={rowClass}
          setRowClass={setRowClass}
          buyItems={buyItems}
        />
      case 'Kits':
        return (
          <>
            <Kits
              kitList={kitList}
              selected={selected}
              setSelected={setSelected}
              rowClass={rowClass}
              setRowClass={setRowClass}
              buyItems={buyItems}
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
              selected={selected}
              setSelected={setSelected}
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              rowClass={rowClass}
              setRowClass={setRowClass}
              buyItems={buyItems}
            />
          </>
        )
      default:
        return null;
    }
  }

  // Save inventory to database and localStorage
  const saveInventory = async () => {
    if (!!auth.state.uuid) {
      try {
        localStorage.setItem('character_inventory', JSON.stringify(inventory));
        localStorage.setItem('character_money', JSON.stringify(characterMoney));
        await AuthAPI.post(`/characters/save_inventory`, inventory);
        await AuthAPI.post(`/characters/save_money`, characterMoney);
      } catch (error) {
        console.log(`Error saving abilities: ${error}`);
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          saveInventory();
          history.push('/character/new/review');
        }}
      >Next</button>
      <button
        type="button"
        onClick={() => {
          history.push('/character/new/talents');
        }}
      >Back to Character Talents</button>
      <h1>Equipment</h1>
      <Money
        moneyList={moneyList}
        characterMoney={characterMoney}
        setCharacterMoney={setCharacterMoney}
        inventoryCount={inventoryCount}
      />
      <Inventory
        inventory={inventory}
        setInventory={setInventory}
        kitList={kitList}
        rowClass={rowClass}
        setRowClass={setRowClass}
        carryLimit={carryLimit}
        selected={selected}
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
      </select>
      <button onClick={(event) => buyItems(event, 1)}>{`Buy ${categorySelected.main === 'Kits' ? 'kit' : 'item'}`}</button>
      {categorySelected.main === 'Kits' ? null :
        <>
          <button onClick={(event) => buyItems(event, 5)}>Buy 5 items</button>
          <button onClick={(event) => buyItems(event, 10)}>Buy 10 items</button>
        </>
      }
      <SwitchEquipment />
    </>
  );
}
