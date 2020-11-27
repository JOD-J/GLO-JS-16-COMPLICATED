"use strict";

let arr = ['3242342', '4223423', '23423', '8678453', '295486', '743534', '234234', '786745'];

arr.forEach(( item ) => {
	if (item.startsWith('2') || item.startsWith('74')) {
		console.log( item );
	}
});

firstFor: for (let i = 2; i < 103; i++) {
	for (let b = 2; b < i; b++){
		if (i % b === 0) {
			continue firstFor;
		}
	}
	console.log( i, 'Делители этого числа: 1 и', i  );
}