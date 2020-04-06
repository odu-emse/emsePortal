export let round_to_precision = (x, precision) => {
  let y = +x + (precision === undefined ? 0.5 : precision / 2);
  return y - (y % (precision === undefined ? 1 : +precision));
};

export let rating = arr => {
  let avg;
  let sum = arr.reduce((previous, current) => (current += previous));
  return (avg = sum / arr.length);
};

export let progress = (dur, rem) => {
  let perc = (rem / dur) * 100;
  return Math.round(perc);
};

//TODO:further integration of this is needed in later release
export let abandonModule = id => {
  //require("../actions/itemActions");
};
