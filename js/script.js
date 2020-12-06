"use strict";

	// вспомогашка
	// setFullYear(year, [month], [date]) Год: четырехзначный год.
	// setMonth(month, [date]) Месяц: месяц года (0-11). По умолчанию 0.
	// setDate(date) День: день месяца (1-31). По умолчанию 1.
	// setHours(hour, [min], [sec], [ms]) Час: час дня (0-23). По умолчанию 0.
	// setMinutes(min, [sec], [ms]) Минуты: Минуты (0-59). По умолчанию 0.
	// setSeconds(sec, [ms]) Секунды: секунды (0-59). По умолчанию 0.
	// setMilliseconds(ms) миллисекунды (0-999). По умолчанию 0.
	// setTime(milliseconds)

let aElem = document.querySelector('.a');
let bElem = document.querySelector('.b');


let getDateA = function(){
	let date = new Date();
	// css 
	aElem.style.width = 'auto';
	aElem.style.height = 'auto';
	aElem.style.fontSize = '20px';
	aElem.style.border = '1px solid silver';
	aElem.style.marginBottom = '30px';
	
	let options = {
        // вывод года
		year: 'numeric',
		// вывод месяца
		month: 'numeric',
		// вывод дней
		day: 'numeric',
		// вывод сегоднящнего дня
		weekday: 'long',
		// разница между верменм UTC
        timezone: 'UTC',
		// вывод часов
		hour: 'numeric',
		// вывод минут
		minute: 'numeric',
		// вывод секунды
		second: 'numeric'
	
	};
	// метод toLocaleString  возвращает строку с языко-зависимым представлением даты по этому в переменной options у всех свойсвт значение numeric
	let string = date.toLocaleString("ru", options);
	// console.log('string: ', string,  typeof string);
	// разбивка строки на масив
	let data = string.split(', ');
	// console.log('data: ', data,  typeof data);
	//  возвращает новую строку 
	let dateNow = data[1].replace('г.', 'года');
	// console.log('dateNow: ', dateNow,  typeof dateNow);

	// getHours(), getMinutes(), getSeconds()
	// Получить, соответственно, часы, минуты, секунды.
	// часы
	let hour = date.getHours();
	// минут
	let minutes = date.getMinutes();
	// сикунды
	let seconds = date.getSeconds();
	// условия выводы часов
	let hourName;
	// услвоия вывода минут
	let minutesName;
	// услвоия вывода секунд
    let secondsName;
	
	// услвоия часов
    if (hour === 1 || hour === 21){
        hourName = 'час';
    } else if ( hour >= 2 && hour < 5) {
        hourName = 'часа';
    } else if ( hour >= 5 && hour < 21) {
        hourName = 'часов';
    } else if(hour > 22 && hour <= 24) {
        hourName = 'часа';
    }

	//  создаем масивы в зависемости от окончания слов (минута минут минуты) и (секунда секунд секунды)
    let one = [1];
    let many = [0, 5, 6, 7, 8, 9];
	let they = [2, 3, 4];
	
	// услвоия минут
    if (one.includes(minutes%10)){
        minutesName = 'минута';
    } else if (many.includes(minutes%10)) {
        minutesName = 'минут';
    } else if (they.includes(minutes%10)) {
        minutesName = 'минуты';
	}
	
	// услвоия секунд
    if (one.includes(seconds%10)){
        secondsName = 'секунда';
    } else if (many.includes(seconds%10)) {
        secondsName = 'секунд';
    } else if (they.includes(seconds%10)) {
        secondsName = 'секунды';
    }

	return (
		'сегодня ' + data[0] 
		+ ' ' + dateNow 
		+ ' ' + hour
		+ ' ' + hourName 
		+ ' ' + minutes
		+ ' ' + minutesName 
		+ ' ' + seconds 
		+ ' ' + secondsName);
};

// вариант б
let getDateb = function(){
	let date = new Date();
	// css
	bElem.style.width = 'auto';
	bElem.style.height = 'auto';
	bElem.style.fontSize = '20px';
	bElem.style.border = '1px solid silver';
    let  options = {
		// вывод года
		year: 'numeric',
		// вывод месяца
		month: 'numeric',
		// вывод дней
		day: 'numeric',
		// вывод часов
		hour: 'numeric',
		// вывод минут
		minute: 'numeric',
		// вывод секунды
        second: 'numeric'
	};
	// метод toLocaleString  возвращает строку с языко-зависимым представлением даты по этому в переменной options у всех свойсвт значение numeric
	let string = date.toLocaleString("ru", options);
	// разбивка строки на масив и 
	return string.split(', ').join(' - ');
};

// выводим в html вариант а 
let setDateA = function () {
    aElem.innerHTML = getDateA();
};
setDateA();
// выводим в html вариант б
let setDateb = function () {
    bElem.innerHTML = getDateb();
};
setDateb();
// setInterval запускает функцию периодически через указанный интервал времени
let timeIntervalA = setInterval(setDateA, 1000);
let timeIntervalB = setInterval(setDateb, 1000);


