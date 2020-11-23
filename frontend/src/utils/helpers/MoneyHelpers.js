export function getTotalMoney(cost) {
  const {
    pounds,
    crowns,
    shillings,
    pennies,
    farthings
  } = cost;

  return ((pounds) * 960 +
    (crowns) * 240 +
    (shillings) * 48 +
    (pennies) * 4 +
    farthings);
}

export function checkMoney(characterMoney, cost, modifier) {
  let totalSpent =
    ((cost.pounds) * 960 +
      (cost.crowns) * 240 +
      (cost.shillings) * 48 +
      (cost.pennies) * 4 +
      cost.farthings) * modifier;

  if ((modifier && characterMoney.singleTotal >= totalSpent) || !modifier) return true;
  return false;
}

export function moneyTransfer(characterMoney, cost, buyOrRefund) {
  let modifier = 0;

  switch (buyOrRefund) {
    case "buy":
      modifier = 1;
      break;
    case "refund":
      modifier = -1;
      break;
    default:
      modifier = 0;
  }

  if (checkMoney(characterMoney, cost, modifier)) {
    const newSingleTotal = characterMoney.singleTotal - getTotalMoney(cost);
    
    const newPounds = Math.floor(newSingleTotal / 960) * modifier;
    const newCrowns = Math.floor((newSingleTotal - (newPounds * 960)) / 240) * modifier;
    const newShillings = Math.floor((newSingleTotal - (newPounds * 960) - (newCrowns * 240)) / 48) * modifier;
    const newPennies = Math.floor((newSingleTotal - (newPounds * 960) - (newCrowns * 240) - (newShillings * 48)) / 4) * modifier;
    const newFarthings = (newSingleTotal - (newPounds * 960) - (newCrowns * 240) - (newShillings * 48) - (newPennies * 4)) * modifier;

    return {
      pounds: { ...characterMoney.pounds, amount: newPounds },
      crowns: { ...characterMoney.crowns, amount: newCrowns },
      shilling: { ...characterMoney.shilling, amount: newShillings },
      penny: { ...characterMoney.penny, amount: newPennies },
      farthing: { ...characterMoney.farthing, amount: newFarthings },
      singleTotal: newSingleTotal
    }
  }
  return false;
}