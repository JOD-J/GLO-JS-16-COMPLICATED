"use strict";

let aElem = document.querySelector('.a');
let bElem = document.querySelector('.b');

let date = new Date();
let a = function(){
	aElem.style.width = 'auto';
	aElem.style.height = 'auto';
	aElem.style.fontSize = '20px';
	aElem.style.border = '1px solid silver';
	aElem.style.marginBottom = '30px';
	// вспомогашка
	// setFullYear(year, [month], [date]) Год: четырехзначный год.
	// setMonth(month, [date]) Месяц: месяц года (0-11). По умолчанию 0.
	// setDate(date) День: день месяца (1-31). По умолчанию 1.
	// setHours(hour, [min], [sec], [ms]) Час: час дня (0-23). По умолчанию 0.
	// setMinutes(min, [sec], [ms]) Минуты: Минуты (0-59). По умолчанию 0.
	// setSeconds(sec, [ms]) Секунды: секунды (0-59). По умолчанию 0.
	// setMilliseconds(ms) миллисекунды (0-999). По умолчанию 0.
	// setTime(milliseconds)
	let components = {
		year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
	};

};
a();

let b = function(){
	bElem.style.width = 'auto';
	bElem.style.height = 'auto';
	bElem.style.fontSize = '20px';
	bElem.style.border = '1px solid silver';
	
};
b();


// let week = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
// let mainElem = document.querySelector('.main');
// let date = new Date();
// let bringOut = function () {
// 	mainElem.style.width = '1000px';
// 	mainElem.style.height = '1000px';
// 	mainElem.style.fontSize = '50px';
// 	let weekMap = week.map(function( item, i ) {
// 		if (i === date.getDay()) {
// 			return `<div><b>${item}</b></div>`;
// 		} else {
// 			return `<div>${item}</div>`;
// 		}
// 	});
// 	let weekMap1 = weekMap.shift();
// 	weekMap.push(weekMap1);
// 	weekMap.forEach(function( item ) {
// 		mainElem.insertAdjacentHTML('beforeend', item);
// 	});
// 	let mainElemAllCss = document.querySelectorAll('div');
// 	mainElemAllCss.forEach(function( item, i ) {
// 		if (i === 5 || i === 6) {
// 			item.classList.add('italic');
// 		}
// 	});
// };
// bringOut();

