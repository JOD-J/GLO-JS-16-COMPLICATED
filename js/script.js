/* eslint-disable max-len */
//======================================================DOMContentLoaded======================================================
// eslint-disable-next-line strict
window.addEventListener('DOMContentLoaded', ()  => {
	'use sctrict';


	//======================================================countTimer===========================================================
	// Timer
	function countTimer(deadline) {
		const timerHoursElem = document.querySelector('#timer-hours'),		// элементы со страницы (hours).
			timerMinutesElem = document.querySelector('#timer-minutes'),	// элементы со страницы (minutes).
			timerSecondsElem = document.querySelector('#timer-seconds');	// элементы со страницы (seconds).
		//======================================================getTimeRemaining======================================================
		function getTimeRemaining() {
			const	dateStop = new Date(deadline).getTime(),	// экземпляр класса date так мы получим конечную дату через метод getTime находим милисекунды.
				dateNow = new Date().getTime(),					// получаем текущю дату через метод getTime находим милисекунды.
				timeRemaining = (dateStop - dateNow) / 1000,	// разница между двумя датами |1000 получаем секунды.
				seconds = Math.floor(timeRemaining % 60),		// % 60 остаток от деления.
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
		}
		//===============================================\\\\\\\getTimeRemaining======================================================
		//======================================================updateClock===========================================================
		const  deletInterval = setInterval(updateClock, 1000); 	// setInterval
		function updateClock() {
			const timer = getTimeRemaining();
			if (timer.timeRemaining >= 0) {
				timerHoursElem.textContent = timer.hours;			// выводим hours в html.
				timerMinutesElem.textContent = timer.minutes;		// выводим minutes в html.
				timerSecondsElem.textContent = timer.seconds;		// выводим seconds в html.
				// console.log('if', timer.timeRemaining);				// проверка работы setInterval.
				if (timer.hours < 10) {
					timerHoursElem.textContent = '0' +  timer.hours;		// конкантенация строки с числом hours.
				}
				if (timer.minutes < 10) {
					timerMinutesElem.textContent = '0' +   timer.minutes;		// конкантенация строки с числом minutes.
				}
				if (timer.seconds < 10) {
					timerSecondsElem.textContent = '0' +   timer.seconds;		// конкантенация строки с числом seconds.
				}
			} else {
				clearInterval(deletInterval);				// удаление deletInterval (удаление setInterval).
				timerHoursElem.textContent = '00';			// присвоение значение 00 для hours в сулчае окончание акции.
				timerMinutesElem.textContent = '00';		// присвоение значение 00 для minutes в сулчае окончание акции.
				timerSecondsElem.textContent = '00';		// присвоение значение 00 для seconds в сулчае окончание акции.
				// console.log('else', timer.timeRemaining);	// проверка удаление setInterval.

			}
		}
		//==============================================\\\\\\\updateClock===========================================================
	}
	//==============================================\\\\\\\countTimer===========================================================
	countTimer('30 December 2020 ');


	//======================================================toggleMenu===========================================================
	// menu
	const toggleMenu = () => {
		const btnMenuElem = document.querySelector('.menu'),		// элементы со тсраницы кнопка header
			menuElem = document.querySelector('menu');				// элементы со тсраницы див с меню
		//======================================================handlerMenu===========================================================
		const handlerMenu = () => {
			menuElem.classList.toggle('active-menu');	 		// навешивание стилей на див
		};
		//==============================================\\\\\\\handlerMenu===========================================================
		//===================================================слушатели==============================================================
		btnMenuElem.addEventListener('click', handlerMenu);			// слушатель на закрытие меню
		menuElem.addEventListener('click', event => {
			const target = event.target;
			if (target.classList.contains('close-btn')) {		// проверки на вложенность получение close-btn
				handlerMenu();									// запуск функции handlerMenu
			} else {
				if (target.closest('ul>li>a')) { 				// получаем ближайший родительский элемент ul>li>a
					handlerMenu();								// запуск функции handlerMenu
				}
			}
		});
		//==============================================\\\\\\\слушатели===========================================================
	};
	//==============================================\\\\\\\toggleMenu===========================================================
	toggleMenu();


	//==============================================\\\\\\\animationBtn===========================================================
	const animationBtn = () => {
		const animationBtn = document.querySelectorAll('a[href*="#"]'),
			animationTime = 500,
			framesCount = 100;
		animationBtn.forEach(item => {
			item.addEventListener('click', event => {
				event.preventDefault();
				const coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
				const scroller = setInterval(() => {
					const scrollBy = coordY / framesCount;
					if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
						window.scrollBy(0, scrollBy);
					} else {
						window.scrollTo(0, coordY);
						clearInterval(scroller);
					}
				}, animationTime / framesCount);
			});
		});

	};
	//==============================================\\\\\\\animationBtn===========================================================
	animationBtn();


	//======================================================togglePopup===========================================================
	// popup
	const togglePopup = () => {
		const popupElem = document.querySelector('.popup'),					// элементы со тсраницы див с самим popup
			btnPopupElem = document.querySelectorAll('.popup-btn');			// элементы со тсраницы кнопки оставить заявку
		//======================================================animatePopup===========================================================
		const animatePopup = () => {
			popupElem.style.transform = `translate(-100%)`;	// убираем popup
			let count = -100;								// счетчик -100 для скрытия popup
			const go = () => {
				count = 5 + count; 							// счетчик прибавляем каждый раз с условием count === 100
				popupElem.style.left = `${count}%`; 		// появление popup окна
				const animate = requestAnimationFrame(go);	// запуск анимации
				if (count === 100) {
					cancelAnimationFrame(animate); 			// отмена анимации при условии count === 100
				}
			};
			requestAnimationFrame(go);						// запуск анимации
		};
		//==============================================\\\\\\\animatePopup======================================================
		//======================================================слушатели===========================================================
		btnPopupElem.forEach(elem => {
			elem.addEventListener('click', () => {
				popupElem.style.display = 'block';	// показываем элемент со страницы popup
				if (window.innerWidth > 768) {
					animatePopup();					// при условие если экран меньше чем 768 отключаем анимацию
				}
			});
		});
		popupElem.addEventListener('click', event => {
			let target = event.target;
			if (target.classList.contains('popup-close')) {
				popupElem.style.display = 'none';
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					popupElem.style.display = 'none';
				}
			}
		});
		//==============================================\\\\\\\слушатели======================================================
	};
	//==============================================\\\\\\\togglePopup======================================================
	togglePopup();



	//======================================================tabs===========================================================
	// табы
	const tabs = () => {
		const tabHeaderElem = document.querySelector('.service-header'),		// элемент со страницы див с сылками
			tabElem = tabHeaderElem.querySelectorAll('.service-header-tab'),	// элемент со страницы ссылки
			tabContentElem = document.querySelectorAll('.service-tab');			// элемент со страницы контент
		//======================================================toggleTabContent===========================================================
		const toggleTabContent = index => {
			for (let i = 0; i < tabContentElem.length; i++) {
				if (index === i) {									// условие
					tabElem[i].classList.add('active');				// добовление  активного класса
					tabContentElem[i].classList.remove('d-none');	// удаление display none
				} else {
					tabElem[i].classList.remove('active');			// удаление активного класса
					tabContentElem[i].classList.add('d-none');		// добовление display none
				}
			}
		};
		//==============================================\\\\\\\toggleTabContent======================================================
		//======================================================слушатель===========================================================
		tabHeaderElem.addEventListener('click', event => {
			let target = event.target;
			target = event.target.closest('.service-header-tab');
			if (target) {
				tabElem.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
		//==============================================\\\\\\\слушатель======================================================
	};
	//==============================================\\\\\\\tabs======================================================
	tabs();
});
//==============================================\\\\\\\DOMContentLoaded======================================================
