"use strict";

let week = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
let mainElem = document.querySelector('.main');
let date = new Date();
let bringOut = function () {
	mainElem.style.width = '1000px';
	mainElem.style.height = '1000px';
	mainElem.style.fontSize = '50px';
	let weekMap = week.map(function( item, i ) {
		if (i === date.getDay()) {
			return `<div><b>${item}</b></div>`;
		} else {
			return `<div>${item}</div>`;
		}
	});
	let weekMap1 = weekMap.shift();
	weekMap.push(weekMap1);
	weekMap.forEach(function( item ) {
		mainElem.insertAdjacentHTML('beforeend', item);
	});
	let mainElemAllCss = document.querySelectorAll('div');
	mainElemAllCss.forEach(function( item, i ) {
		if (i === 5 || i === 6) {
			item.classList.add('italic');
		}
	});
};
bringOut();
