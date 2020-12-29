/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
"use strict";

const ulElem = document.querySelector('.ul'),
	days  = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
	date = new Date(),
	hours = date.getHours(),
	dateNewYear = new Date(2020, 11, 31);

const dateTime =  {
	getTimeRemaining: () => {
		const	dateStop = new Date(dateNewYear).getTime(),	// экземпляр класса date так мы получим конечную дату через метод getTime находим милисекунды.
			dateNow = new Date().getTime(),					// получаем текущю дату через метод getTime находим милисекунды.
			timeRemaining = (dateStop - dateNow) / 1000,	// разница между двумя датами |1000 получаем секунды.
			seconds = Math.floor(timeRemaining % 60),		// % 60 остаток от деления.
			minutes = Math.floor((timeRemaining / 60) % 60),
			hours = Math.floor(timeRemaining / 60 / 60),
			days =  Math.floor(timeRemaining / 60 / 60 / 24);
		return { timeRemaining, days, hours, minutes, seconds };
	},
	getStyleDateTime: () => {
		ulElem.style.width = '500px';
		ulElem.style.height = '200px';
		ulElem.style.border = '1px solid red';
	},
	getGood: () => {
		const li = document.createElement('li');
		const timer = dateTime.getTimeRemaining();
		if (timer.hours >= 12) {
			li.textContent = `Добрый день`;
			return ulElem.append(li);
		} else if (timer.hours >= 18) {
			li.textContent = `Добрый вечер`;
			return ulElem.append(li);
		} else if (timer.hours >= 24) {
			li.textContent = `Доброй ночи`;
			return	ulElem.append(li);
		} else if (timer.hours >= 6) {
			li.textContent = `Доброe утро`;
			return ulElem.append(li);
		}
	},
	getToDay: () => {
		const li = document.createElement('li');
		li.textContent = `Сегодня ${days[date.getDay()]}`;
		return ulElem.append(li);
	},
	getTime: () => {
		const li = document.createElement('li');
		li.textContent = `Текущее время: ${date.toTimeString().slice(0, 8)}`;
		return ulElem.append(li);

	},
	getDayToNewYear: () => {
		const li = document.createElement('li');
		const timer = dateTime.getTimeRemaining();
		const dayToNewYear = timer.days;
		li.textContent = `До нового года осталось ` + dayToNewYear + ` дней`;
		return ulElem.append(li);
	},
	showDateTime: () => {
		dateTime.getStyleDateTime();
		dateTime.getGood();
		dateTime.getToDay();
		dateTime.getTime();
		dateTime.getDayToNewYear();
	},
};

dateTime.showDateTime();
