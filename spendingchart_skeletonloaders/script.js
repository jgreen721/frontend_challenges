let barTemplate = document.querySelector(".bar-template");
let chartCardEl = document.querySelector(".chart-card");
let chartEl = document.querySelector(".chart");
let refreshBtn = document.querySelector(".refresh-btn");
const DAYS = 7;
const HIGHEST_DAILY_TOTAL_RANGE = 50;
const MIN_DAILY_TOTAL = 25;

/*app values*/

let balance = 921.48;
let total = 478.33;
let prevTotal;
let interest = 2.4;

let isReset = false; //toggles to control initial render vs refresh
let toggledPrev = false;

function generateSkeletonColumns() {
  chartEl.innerHTML = "";
  for (let i = 0; i < DAYS; i++) {
    let column = barTemplate.content.cloneNode(true);
    let barHeight = ((Math.random() * 125) | 0) + 25;
    column.querySelector(".skeleton-bar").style.height = `${barHeight}px`;
    chartEl.appendChild(column);
  }
}

async function setData() {
  toggleBtn(); // toggle btn to loading/disabled during the rendering operations
  generateSkeletonColumns();
  let dailyTotals;
  let weeklyTotal;
  let interestSign = "+";

  if (isReset) {
    //cost of fat function, a toggle/check to distinguish initial render from refresh's
    reapplyAllSkeletons();
    dailyTotals = createDailyTotals(DAYS);
    weeklyTotal = calculateTotal(dailyTotals);
  } else {
    // first time load values
    dailyTotals = await handleFirstRender();
    weeklyTotal = calculateTotal(dailyTotals);
  }

  if (prevTotal) {
    console.log("show previous");
    interest = Math.abs(prevTotal - weeklyTotal) / prevTotal;
    interest = interest.toFixed(1);
    interestSign =
      Math.abs(interest) < 0.1 ? "" : prevTotal < weeklyTotal ? "+" : "-";
    if (!toggledPrev) {
      document.querySelector(".prev-div").style.opacity = 1;
      toggledPrev = true;
    }
  }
  console.log("weeklyTotal", weeklyTotal);

  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        //simulate API calls -- populate skeletons accordingly
        if (i == 0) renderEl(weeklyTotal, "total", true, "h1");
        if (i == 1 && !isReset) renderEl(DAYS, "days-total", false, "h1");

        if (i == 2 && !isReset) {
          //due to setTimeout/scope behavior, we need to update isReset within the delay block otherwise undesired behavior.
          renderEl(balance, "balance", true, "h1");
          isReset = true;
        }

        if (i == 2) renderEl(interest, "interest", false, "h3", interestSign);
        if (i == 2 && prevTotal) renderEl(prevTotal, "prev", false, "h5");
        if (i == 2) renderAllColumns(dailyTotals);
      }, i * 2000);
    }
  }, 2000);

  setTimeout(() => (prevTotal = weeklyTotal), 6500);
}

function renderEl(val, category, showCounter, el, interestSign = "+") {
  let initialRenderVal = val;

  if (showCounter) {
    let diff = ((Math.random() * (val - 85)) | 0) + 85; //create random difference to allow UX counter-FX
    initialRenderVal = (val - diff).toFixed(2);
  }

  let renderTemplate = initialRenderVal;

  if (category == "balance") renderTemplate = `$${renderTemplate}`; // build out templates accordingly
  if (category == "total") renderTemplate = `$${renderTemplate}`;
  if (category == "interest")
    renderTemplate = `${interestSign}${renderTemplate}%`;

  chartCardEl.querySelector(
    `[data-${category}]`
  ).innerHTML = `<div class="fade-in"><${el}>${renderTemplate}</${el}></div>`;

  // if (category != "interest")
  console.log(
    `Passing ${initialRenderVal} as initial value to increment up to ${val} for ${category} category.`
  );
  incrementToBalance(initialRenderVal, val, category);
}

function renderColumn(day, dailyTotal) {
  chartEl.querySelectorAll("[data-bar]")[
    dailyTotal.id - 1
  ].innerHTML = `<div class="chart-bar" style="height:${dailyTotal.total}px"><div class="floaty">$${dailyTotal.total}</div></div>`;
  chartEl.querySelectorAll("[data-day]")[
    dailyTotal.id - 1
  ].innerHTML = `<h3 class="day-h3 mid-thin">${day}</h3>`;

  //add highest attributes for styling

  if (dailyTotal.isHighest) {
    chartEl
      .querySelectorAll(".chart-bar")
      [dailyTotal.id - 1].classList.add("tallest-bar");
    chartEl
      .querySelectorAll(".floaty")
      [dailyTotal.id - 1].classList.add("blue-floaty");
  } else {
    chartEl
      .querySelectorAll(".chart-bar")
      [dailyTotal.id - 1].classList.add("reg-bar");
  }
}

function renderAllColumns(dailyTotals) {
  let days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
  // console.log("renderAllColumns fire");
  for (let i = 0; i < DAYS; i++) {
    setTimeout(() => {
      chartEl
        .querySelectorAll(".bar-column")
        [i].querySelector("[data-bar]").innerHTML = "";
      chartEl
        .querySelectorAll(".bar-column")
        [i].querySelector("[data-day]").innerHTML = "";
      renderColumn(days[i], dailyTotals[i]);
      if (i == DAYS - 1) setTimeout(() => toggleBtn(), 1250); // last event of rendering so toggle btn back to active
    }, i * 250);
  }
}

function reapplySkeleton(dataType, el, placeholder) {
  document.querySelector(`[data-${dataType}]`).innerHTML = "";
  document.querySelector(
    `[data-${dataType}]`
  ).innerHTML = `<div class="skeleton"><${el} class="no-opacity">${placeholder}</${el}></div>`;
}

function reapplyAllSkeletons() {
  // reapplySkeleton("days-total", "h1", 5);
  reapplySkeleton("total", "h1", 2245);
  // reapplySkeleton("balance", "h1", 2245);    //doesn't make as much sense to reload
  reapplySkeleton("interest", "h4", 224);
  reapplySkeleton("prev", "h5", 224);
}

function toggleBtn() {
  if (refreshBtn.textContent.toLowerCase() == "update") {
    refreshBtn.textContent = "LOADING";
    refreshBtn.classList.remove("active-btn");
    refreshBtn.classList.add("disabled");
    refreshBtn.disabled = true;
  } else {
    refreshBtn.textContent = "Refresh";
    refreshBtn.classList.add("active-btn");
    refreshBtn.classList.remove("disabled");

    refreshBtn.disabled = false;
  }
}

// initiates first render
setData();

function handleFirstRender() {
  return new Promise((resolve) => {
    let formattedData = [];
    fetch("data.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        formattedData = [{ id: 1, total: res[0].amount, isHighest: true }]; //repeated logic (./helpers/createDailyTotals) but ohwell
        let highest = res[0].amount;
        for (let i = 1; i < res.length; i++) {
          if (highest < res[i].amount) {
            highest = res[i].amount;
            formattedData.push({
              id: i + 1,
              total: res[i].amount,
              isHighest: true,
            });
            formattedData = formattedData.map((f) =>
              f.id == i + 1 ? f : { ...f, isHighest: false }
            );
          } else {
            formattedData.push({
              id: i + 1,
              total: res[i].amount,
              isHighest: false,
            });
          }
        }
        resolve(formattedData);
      });
  });
}

handleFirstRender();
