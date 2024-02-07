function incrementToBalance(curr, total, category) {
  if (Math.ceil(curr) >= Math.ceil(total)) {
    //round up to avoid unpredictable behavior of float comparison
    return;
  }
  curr++;
  chartCardEl
    .querySelector(`[data-${category}]`)
    .querySelector(".fade-in").innerHTML = `<h1>$${curr.toFixed(2)}</h1>`;
  setTimeout(() => incrementToBalance(curr, total, category), 2);
}

function createDailyTotals(DAYS) {
  let dailyTotals = [];
  let highest = Math.random() * HIGHEST_DAILY_TOTAL_RANGE + MIN_DAILY_TOTAL;
  highest = highest.toFixed(2);
  dailyTotals.push({ id: 1, total: highest, isHighest: true });
  for (let i = 1; i < DAYS; i++) {
    let dailyTotal =
      Math.random() * HIGHEST_DAILY_TOTAL_RANGE + MIN_DAILY_TOTAL;
    dailyTotal = dailyTotal.toFixed(2);
    let id = i + 1;

    if (Math.ceil(dailyTotal) > Math.ceil(highest)) {
      console.log(
        "Resetting highest to " +
          dailyTotal +
          "from its previous value of " +
          highest
      );
      highest = dailyTotal;
      dailyTotals.push({ id, total: dailyTotal, isHighest: true });
      dailyTotals = dailyTotals.map((h, i) =>
        h.id == id ? h : { ...h, isHighest: false }
      );
    } else {
      dailyTotals.push({ id, total: dailyTotal, isHighest: false });
    }
  }
  console.log("dailyTotal", dailyTotals);
  return dailyTotals;
}

function calculateTotal(totals) {
  let weeklyTotal = totals.reduce((a, b) => (a += parseFloat(b.total)), 0);
  weeklyTotal = weeklyTotal.toFixed(2);
  return weeklyTotal;
}
