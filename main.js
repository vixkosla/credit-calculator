const maxParameterOne = 6200000,
  maxParameterTwo = 100,
  maxParameterThree = 30;

const minParameterOne = 2700000,
  minParameterTwo = 15,
  minParameterThree = 1;

const defaultParameterTwo = 20;

const sberbank = 9.3,
  vtb = 8.6,
  akBars = 7.99,
  mkb = 8.15,
  rf = 7.3,
  vozrochdenie = 8.5,
  rosSelchoz = 10,
  psb = 9.1,
  transCapital = 8.49;

var percentOne, percentTwo, percentThree;

var paymentElSberbank = document.getElementById("payment-amount-sberbank");

// first parameter

let sliderOne = document.getElementById("apart-price-range");
let outputOne = document.getElementById("apart-price");
let barOne = document.getElementById("apart-price-bar");

// second parameter

let sliderTwo = document.getElementById("start-price-range");
let outputTwo = document.getElementById("start-price");
let barTwo = document.getElementById("start-price-bar");
let anotherOutputTwo = document.getElementById("start-price-percentage");

// third parameter

let sliderThree = document.getElementById("period-range");
let outputThree = document.getElementById("period");
let barThree = document.getElementById("period-bar");

// Display the default slider's (first and second) values with indents

outputOne.value = numberWithSpaces(sliderOne.value);
outputTwo.value = numberWithSpaces(
  Math.floor((sliderOne.value * sliderTwo.value) / 100)
);

// Default bar positions

percentOne =
  (sliderOne.value / minParameterOne - 1) /
  (maxParameterOne / minParameterOne - 1);
barOne.style.width = `${percentOne * 100}%`; // display the default position of the bar

percentTwo =
  (sliderTwo.value / minParameterTwo - 1) /
  (maxParameterTwo / minParameterTwo - 1);
barTwo.style.width = `${percentTwo * 100}%`;

percentThree =
  (sliderThree.value / minParameterThree - 1) /
  (maxParameterThree / minParameterThree - 1);
barThree.style.width = `${percentThree * 100}%`;

outputThree.value = numberWithSpaces(sliderThree.value);

// Update the current slider value (each time you drag the slider handle)
// and adjust no-default-bar's to certain width depend on values

sliderOne.oninput = function() {
  outputOne.value = numberWithSpaces(this.value);

  percentOne =
    (this.value / minParameterOne - 1) /
    (maxParameterOne / minParameterOne - 1);

  barOne.style.width = `${percentOne * 100}%`;

  //update output value for start price
  sliderTwo.value = defaultParameterTwo;

  outputTwo.value = numberWithSpaces(
    Math.floor((this.value * sliderTwo.value) / 100)
  );

  percentTwo =
    (defaultParameterTwo / minParameterTwo - 1) /
    (maxParameterTwo / minParameterTwo - 1);

  barTwo.style.width = `${percentTwo * 100}%`;
  anotherOutputTwo.innerHTML = `${defaultParameterTwo}%`;

  // set default 20% start price from current apart price
  // outputTwo.value = numberWithSpaces(
  //   Math.floor((sliderOne.value * defaultParameterTwo) / 100)
  // );
  paymentElSberbank.innerHTML = numberWithSpaces(
    Math.floor(
      annuityCredit(
        sberbank,
        this.value,
        numberWithoutSpaces(outputTwo.value),
        sliderThree.value
      )
    )
  );
};

outputOne.oninput = function() {
  sliderOne.value = numberWithoutSpaces(this.value);
  this.value = numberWithSpaces(+numberWithoutSpaces(this.value));

  percentOne =
    (sliderOne.value / minParameterOne - 1) /
    (maxParameterOne / minParameterOne - 1);

  barOne.style.width = `${percentOne * 100}%`;

  //update output value for start price
  sliderTwo.value = defaultParameterTwo;

  outputTwo.value = numberWithSpaces(
    Math.floor((numberWithoutSpaces(this.value) * sliderTwo.value) / 100)
  );

  percentTwo =
    (defaultParameterTwo / minParameterTwo - 1) /
    (maxParameterTwo / minParameterTwo - 1);

  barTwo.style.width = `${percentTwo * 100}%`;
  anotherOutputTwo.innerHTML = `${defaultParameterTwo}%`;

  // set default 20% start price from current apart price
  // defaultStartPrice();

  paymentElSberbank.innerHTML = numberWithSpaces(
    Math.floor(
      annuityCredit(
        sberbank,
        numberWithoutSpaces(outputOne.value),
        numberWithoutSpaces(outputTwo.value),
        sliderThree.value
      )
    )
  );
};

sliderTwo.oninput = function() {
  outputTwo.value = numberWithSpaces(
    Math.floor((numberWithoutSpaces(outputOne.value) * this.value) / 100)
  );

  // this.value = numberWithSpaces(numberWithoutSpaces(this.value));
  percentTwo =
    (this.value / minParameterTwo - 1) /
    (maxParameterTwo / minParameterTwo - 1);

  barTwo.style.width = `${percentTwo * 100}%`;
  anotherOutputTwo.innerHTML = `${this.value}%`;

  paymentElSberbank.innerHTML = numberWithSpaces(
    Math.floor(
      annuityCredit(
        sberbank,
        numberWithoutSpaces(outputOne.value),
        numberWithoutSpaces(outputTwo.value),
        sliderThree.value
      )
    )
  );
};

outputTwo.oninput = function() {
  this.value = numberWithSpaces(+numberWithoutSpaces(this.value));

  const temp = Math.floor(
    (numberWithoutSpaces(this.value) / numberWithoutSpaces(outputOne.value)) *
      100
  );

  sliderTwo.value = temp;

  percentTwo =
    (sliderTwo.value / minParameterTwo - 1) /
    (maxParameterTwo / minParameterTwo - 1);

  barTwo.style.width = `${percentTwo * 100}%`;
  anotherOutputTwo.innerHTML = temp > 100 ? `> 100%` : `${temp}%`;

  paymentElSberbank.innerHTML = numberWithSpaces(
    Math.floor(
      annuityCredit(
        sberbank,
        numberWithoutSpaces(outputOne.value),
        numberWithoutSpaces(outputTwo.value),
        sliderThree.value
      )
    )
  );
};

sliderThree.oninput = function() {
  outputThree.value = numberWithSpaces(this.value);

  percentThree =
    (this.value / minParameterThree - 1) /
    (maxParameterThree / minParameterThree - 1);

  barThree.style.width = `${percentThree * 100}%`;

  paymentElSberbank.innerHTML = numberWithSpaces(
    Math.floor(
      annuityCredit(
        sberbank,
        numberWithoutSpaces(outputOne.value),
        numberWithoutSpaces(outputTwo.value),
        this.value
      )
    )
  );
};

outputThree.oninput = function() {
  this.value = numberWithSpaces(+numberWithoutSpaces(this.value));

  sliderThree.value = numberWithoutSpaces(this.value);

  percentThree =
    (sliderThree.value / minParameterThree - 1) /
    (maxParameterThree / minParameterThree - 1);

  barThree.style.width = `${percentThree * 100}%`;

  paymentElSberbank.innerHTML = numberWithSpaces(
    Math.floor(
      annuityCredit(
        sberbank,
        numberWithoutSpaces(outputOne.value),
        numberWithoutSpaces(outputTwo.value),
        this.value
      )
    )
  );
};

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function numberWithoutSpaces(x) {
  return x.toString().replace(/\s/g, "");
}

// function defaultStartPrice() {}

function annuityCredit(percentageRateYearly, apartPrice, startPrice, period) {
  if (period == 0) {
    return 0;
  } else {
    let percentageRateMonthly = percentageRateYearly / 12 / 100;
    let temp = Math.pow(1 + percentageRateMonthly, period * 12);
    let coefficient = (temp * percentageRateMonthly) / (temp - 1);
    let everyMonthPayment = (apartPrice - startPrice) * coefficient;

    return everyMonthPayment > 0 ? everyMonthPayment : 0;
  }
}