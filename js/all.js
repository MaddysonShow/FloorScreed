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
  if (msquareP > 5000) {msquare.value = 5000; calculator(); return;}
  if (floorHeightP > 80) {floorHeight.value = 80; calculator(); return;}
  if (isNaN(msquareP) || isNaN(floorHeightP)) {return;}
  if (msquareP < 0) {msquare.value = 1; calculator(); return;}
  if (floorHeightP < 8) {floorHeight.value = 8; calculator(); return;}
  let result = 0

    if (msquareP <= 0 || floorHeightP <= 0) {calcPrice.innerText = ''; return}
    console.log(msquareP, floorHeightP)
    let workPrice = msquareP >= 51 ? 1000:1200
    result = workPrice * msquareP + floorHeightP * 3.20 * msquareP
    calcPrice.innerText = result.toString()

  // else {
  //   // calcPrice.innerText = 'Введите значение'
  // }
}