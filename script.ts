import { countryList } from "./code.js"; 

const BASE_URL = "https://v6.exchangerate-api.com/v6/989f91657ad7db1885ddd9e8/pair";


const dropdowns = document.querySelectorAll(".dropdown select") as NodeListOf<HTMLSelectElement>;
let btn = document.querySelector("form button") as HTMLButtonElement;
const fromCurr = document.querySelector(".from select") as HTMLSelectElement;
const toCurr = document.querySelector(".to select") as HTMLSelectElement;
let msg = document.querySelector(".msg") as HTMLDivElement;

dropdowns.forEach((select) => {
  for (let CurrCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = CurrCode;
    newOption.innerText = CurrCode;
    select.appendChild(newOption);

    if (select.name === "from" && CurrCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && CurrCode === "PKR") {
      newOption.selected = true;
    }
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target as HTMLSelectElement);
  });
});

const updateFlag = (element: HTMLSelectElement) => {
  let CurrCode = element.value as keyof typeof countryList;
  let countryCode = countryList[CurrCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement?.querySelector("img") as HTMLImageElement;
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input") as HTMLInputElement;
  let amtVal = amount.value;
  if (amtVal === "" || Number(amtVal) < 1) {
    amtVal = "1";
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.conversion_rate;

  let finalAmount = Number(amtVal) * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});
