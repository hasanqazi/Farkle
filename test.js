// function calculateScore() {
//   var score = 0;
//   var counts = {};
//   for (var i = 0; i < diceArr.length; i++) {
//     var value = diceArr[i].value;
//     if (value == 1) {
//       score += 100;
//       counts[1] = counts[1] ? counts[1] + 1 : 1;
//     } else if (value == 5) {
//       score += 50;
//       counts[5] = counts[5] ? counts[5] + 1 : 1;
//     } else {
//       counts[value] = counts[value] ? counts[value] + 1 : 1;
//     }
//   }

//   for (var value in counts) {
//     if (counts.hasOwnProperty(value)) {
//       if (counts[value] >= 3) {
//         if (value == 1) {
//           score += 900;
//         } else {
//           score += value * 100;
//         }
//         counts[value] -= 3;
//       }
//     }
//   }

//   for (var value in counts) {
//     if (counts.hasOwnProperty(value)) {
//       if (value == 1) {
//         score += counts[value] * 100;
//       } else if (value == 5) {
//         score += counts[value] * 50;
//       }
//     }
//   }

//   console.log(score);
// }

function bankScore(){
	var score = 0;
	var diceCount = [0, 0, 0, 0, 0, 0];
	for(var i = 0; i < diceArr.length; i++){
			if(diceArr[i].clicked === 1){
					diceCount[diceArr[i].value - 1]++;
			}
	}
	if(diceCount[0] >= 3){
			score += 1000;
			diceCount[0] -= 3;
	}
	for(var i = 1; i < diceCount.length; i++){
			if(diceCount[i] >= 3){
					score += (i + 1) * 100;
					diceCount[i] -= 3;
			}
	}
	score += diceCount[0] * 100;
	score += diceCount[4] * 50;
	document.getElementsByClassName("score")[0].innerHTML = score;
}