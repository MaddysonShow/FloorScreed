let msquare = document.getElementById('meters')
let floorHeight = document.getElementById('height')
let calcPrice = document.getElementById('calcPrice')

document.addEventListener("input", EventSelector)
function EventSelector(ev) {
  console.log(ev.target.id);
  switch (ev.target.id) {
    case 'meters': {calculator(); break}
    case 'height': {calculator(); break}
  }
}

function calculator() {
  let msquareP = parseInt(msquare.value)
  let floorHeightP = parseInt(floorHeight.value)
  if (isNaN(msquareP) || isNaN(floorHeightP)) {return;}
  if (msquareP > 5000) {msquare.value = 5000; calculator(); return;}
  if (floorHeightP > 80) {floorHeight.value = 80; calculator(); return;}

  if (msquareP < 0) {msquare.value = 1; calculator(); return;}
  if (floorHeightP < 1) {floorHeight.value = 1; calculator(); return;}
  let result = 0

    if (msquareP <= 0 || floorHeightP <= 0) {calcPrice.innerText = ''; return}

    let workPrice = 0
  //switch WP between floor perimeter
      if (msquareP >= 200) {workPrice = 900}
      else if(msquareP >= 100) {workPrice = 1100}
      else if (msquareP >= 50) {workPrice = 1300}
      else if (msquareP >= 1) {workPrice = 1400}

  console.log(msquareP, floorHeightP, workPrice)
    result = workPrice * msquareP + floorHeightP * 3.20 * msquareP
    calcPrice.innerText = Math.round(result).toString()

  // else {
  //   // calcPrice.innerText = 'Введите значение'
  // }
}