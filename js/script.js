/* eslint-disable max-len */
//======================================================DOMContentLoaded======================================================
// eslint-disable-next-line strict
window.addEventListener('DOMContentLoaded', () => {
	'use sctrict';


	//======================================================countTimer===========================================================
	// Timer
	function countTimer(deadline) {
		const timerHoursElem = document.querySelector('#timer-hours'),		// элементы со страницы (hours).
			timerMinutesElem = document.querySelector('#timer-minutes'),	// элементы со страницы (minutes).
			timerSecondsElem = document.querySelector('#timer-seconds');	// элементы со страницы (seconds).
		//======================================================getTimeRemaining======================================================
		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime(),	// экземпляр класса date так мы получим конечную дату через метод getTime находим милисекунды.
				dateNow = new Date().getTime(),					// получаем текущю дату через метод getTime находим милисекунды.
				timeRemaining = (dateStop - dateNow) / 1000,	// разница между двумя датами |1000 получаем секунды.
				seconds = Math.floor(timeRemaining % 60),		// % 60 остаток от деления.
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
		}
		//===============================================\\\\\\\getTimeRemaining======================================================
		//======================================================updateClock===========================================================
		const deletInterval = setInterval(updateClock, 1000); 	// setInterval
		function updateClock() {
			const timer = getTimeRemaining();
			if (timer.timeRemaining >= 0) {
				timerHoursElem.textContent = timer.hours;			// выводим hours в html.
				timerMinutesElem.textContent = timer.minutes;		// выводим minutes в html.
				timerSecondsElem.textContent = timer.seconds;		// выводим seconds в html.
				if (timer.hours < 10) {
					timerHoursElem.textContent = '0' + timer.hours;		// конкантенация строки с числом hours.
				}
				if (timer.minutes < 10) {
					timerMinutesElem.textContent = '0' + timer.minutes;		// конкантенация строки с числом minutes.
				}
				if (timer.seconds < 10) {
					timerSecondsElem.textContent = '0' + timer.seconds;		// конкантенация строки с числом seconds.
				}
			} else {
				clearInterval(deletInterval);				// удаление deletInterval (удаление setInterval).
				timerHoursElem.textContent = '00';			// присвоение значение 00 для hours в сулчае окончание акции.
				timerMinutesElem.textContent = '00';		// присвоение значение 00 для minutes в сулчае окончание акции.
				timerSecondsElem.textContent = '00';		// присвоение значение 00 для seconds в сулчае окончание акции.
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
		const animationBtn = document.querySelector('main>a'),
			animationTime = 500,
			framesCount = 100;


		animationBtn.addEventListener('click', event => {
			event.preventDefault();
			const coordY = document.querySelector(animationBtn.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
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
		const animationBtnn = document.querySelectorAll('menu>ul>li>a[href]'),
			animationTimen = 500,
			framesCountn = 100;
		animationBtnn.forEach(item => {
			item.addEventListener('click', event => {
				event.preventDefault();
				const coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
				const scroller = setInterval(() => {
					const scrollBy = coordY / framesCountn;
					if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
						window.scrollBy(0, scrollBy);
					} else {
						window.scrollTo(0, coordY);
						clearInterval(scroller);
					}
				}, animationTimen / framesCountn);
			});
		});
	};
	//==============================================\\\\\\\animationBtn===========================================================
	animationBtn();


	//======================================================togglePopup===========================================================
	// popup
	const togglePopup = () => {
		const popupElem = document.querySelector('.popup'),					// элементы со тсраницы див с самим popup
			btnPopupElem = document.querySelectorAll('.popup-btn'),			// элементы со тсраницы кнопки оставить заявку
			popupContentElem = document.querySelector('.popup-content');	// элементы со тсраницы контейнер для popup
		//======================================================animatePopup===========================================================
		const animatePopup = () => {
			popupContentElem.style.transform = `translate(-50%)`;	// убираем popup
			let count = -100;								// счетчик -100 для скрытия popup
			const go = () => {
				count = 1 + count; 							// счетчик прибавляем каждый раз с условием count === 100
				popupContentElem.style.left = `${count}%`; 		// появление popup окна
				const animate = requestAnimationFrame(go);	// запуск анимации
				if (count === 50) {
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


	//======================================================slider===========================================================
	// slider
	const slider = () => {
		const slideElem = document.querySelectorAll('.portfolio-item'),		// элемент со страницы картинки
			sliderElem = document.querySelector('.portfolio-content'),		// элемент со страницы ул контейнер
			portfolioDotsElem = document.querySelector('.portfolio-dots');	// элемент со страницы ul для li
		for (let i = 0; i < slideElem.length; i++) {						// добавление dot в слайдер
			const dotCreatesElem = document.createElement('li');					// создание элемента li для portfolioDotsElem
			dotCreatesElem.classList.add('dot');									// присваеваем dotCreatesElem класс dot
			portfolioDotsElem.insertAdjacentElement('afterbegin', dotCreatesElem); 	// добовляем в portfolioDotsElem полученный dotCreatesElem
		}
		const dot = document.querySelectorAll('.dot');						// получаем dot для дальнейшей работы
		dot[0].classList.add('dot-active'); 								// активный класс дайем первой точке
		let currentSlide = 0, 												// номер слайда для изменение слайда
			interval;
		//======================================================prevSlide===========================================================
		const prevSlide = (elem, index, strClass) => {						// удаление  у слайда класса
			elem[index].classList.remove(strClass);
		};
		//==============================================\\\\\\\prevSlide======================================================
		//======================================================nextSlide===========================================================
		const nextSlide = (elem, index, strClass) => {						//  добовление у слайда класса
			elem[index].classList.add(strClass);
		};
		//==============================================\\\\\\\nextSlide======================================================
		//======================================================autoPlaySlide===========================================================
		const autoPlaySlide = () => {  										// запуск слайда автоматически
			prevSlide(slideElem, currentSlide, 'portfolio-item-active');	//  удаление у слайда активных  картинок
			prevSlide(dot, currentSlide, 'dot-active');						//  удаление у слайда активных точек
			currentSlide++;													// переход к след слайду
			if (currentSlide >= slideElem.length) {
				currentSlide = 0; 											// возфращение на 1 слайд
			}
			nextSlide(slideElem, currentSlide, 'portfolio-item-active');	// добовление  у слайда активных  картинок
			nextSlide(dot, currentSlide, 'dot-active');					// добовление у слайда активных точек
		};
		//==============================================\\\\\\\autoPlaySlide======================================================
		//======================================================startSlide===========================================================
		const startSlide = (time = 3000) => {								// запуск слайда при определенных условиях
			interval = setInterval(autoPlaySlide, time);
		};
		//==============================================\\\\\\\startSlide======================================================
		//======================================================stopSlide===========================================================
		const stopSlide = () => {											// остановка слайда при определенных условиях
			clearInterval(interval);
		};
		//==============================================\\\\\\\stopSlide======================================================
		//======================================================слушатели===========================================================
		sliderElem.addEventListener('click', event => {
			event.preventDefault(); 										// отмена действие по умолчанию
			const target = event.target; 									// target = элементу со страницы
			if (!target.matches('.portfolio-btn, .dot')) { 					// если не .portfolio-btn, .dot то return
				return;
			}
			prevSlide(slideElem, currentSlide, 'portfolio-item-active');	//  удаление у слайда активных  картинок
			prevSlide(dot, currentSlide, 'dot-active');						//  удаление у слайда активных точек
			if (target.matches('#arrow-right')) {							// клик по кнопке  право вперед слайд
				currentSlide++;												// вперед слайд
			} else if (target.matches('#arrow-left')) {						// клик по кнопке лево назад слайд
				currentSlide--;												// назад слайд
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}
			if (currentSlide >= slideElem.length) {
				currentSlide = 0;											// возфращение на 1 слайд
			}
			if (currentSlide < 0) {
				currentSlide = slideElem.length - 1;						// возфращение на 1 слайд
			}
			nextSlide(slideElem, currentSlide, 'portfolio-item-active');	// добовление  у слайда активных  картинок
			nextSlide(dot, currentSlide, 'dot-active');						// добовление у слайда активных точек
		});
		sliderElem.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				stopSlide();
			}
		});
		sliderElem.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				startSlide();
			}
		});
		//==============================================\\\\\\\слушатели======================================================

		startSlide(1500);
	};
	//==============================================\\\\\\\slider======================================================
	slider();


	//======================================================ourTeam==========================================================
	// смнеа нашей команды картинки
	const ourTeam = () => {
		const commandElem = document.querySelector('.command'); 	// находи родительский элемент нашей комады
		const links = {}; 											// создаем объект для сохранение исходной картинки
		commandElem.addEventListener('mouseover', event => { 		// наведение
			const target = event.target; 							// делегирование
			if (target.matches('.command__photo')) { 				// находим наш обьект
				links[target.dataset.img] = target.src; 			// записываем исходную картинку
				target.src = target.dataset.img; 					// задаем новую картинку
			}
		});
		commandElem.addEventListener('mouseout', event => { 		// не наведение
			const target = event.target; 							// делегирование
			if (target.matches('.command__photo')) { 				// находим наш обьект
				target.src = links[target.dataset.img]; 			// переписываем новую картинку на исходную
			}
		});
	};
	//==============================================\\\\\\\ourTeam======================================================
	ourTeam();


	//======================================================calculator==========================================================
	// калькулятор
	const calculator = (price = 100) => {
		const calcBlockElem = document.querySelector('.calc-block'),		// находи родительский элемент калькулятор
			calcTypeElem = document.querySelector('.calc-type'),			// select
			calcSquareElem = document.querySelector('.calc-square'),		// общая площадь
			calcCountElem = document.querySelector('.calc-count'),			// количесвто помещений
			calcDayElem = document.querySelector('.calc-day'),				// срок исполнения в днях
			totalValueElem = document.getElementById('total');				// цена
		let interval;
		//======================================================countSum===========================================================
		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1,
				step = 0;
			const typeValue = calcTypeElem.options[calcTypeElem.selectedIndex].value;
			const squareValue = +calcSquareElem.value;
			if (calcCountElem.value > 1) {
				countValue += (calcCountElem.value - 1) / 10;
			}
			if (calcDayElem.value && calcDayElem.value < 5) {
				dayValue *= 2;
			} else if (calcDayElem.value && calcDayElem.value < 10) {
				dayValue *= 1.5;
			}
			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}
			cancelAnimationFrame(interval);
			const animateSumm = () => {
				interval = requestAnimationFrame(animateSumm, 50);
				if (step < total && total < 5000) {
					step += 50;
					totalValueElem.textContent = step;
				} else if (step < total && total > 5000) {
					step += 1000;
					totalValueElem.textContent = step;
				} else if (step > total) {
					cancelAnimationFrame(interval);
					totalValueElem.textContent = Math.floor(total);
				}
				calcTypeElem.addEventListener('input', () => {
					totalValueElem.textContent = 0;
					calcSquareElem.value = '';
					calcDayElem.value = '';
					calcCountElem.value = '';
				});
			};
			interval = requestAnimationFrame(animateSumm);
		};
		//==============================================\\\\\\\countSum======================================================

		calcBlockElem.addEventListener('change', event => {				// слушатель
			const target = event.target;							// делегирование
			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
		calcBlockElem.addEventListener('input', event => {				// слушатель
			const target = event.target;							// делегирование
			if (target.matches('.calc-square') ||
				target.matches('.calc-count') ||
				target.matches('.calc-day')) {
				target.value = target.value.replace(/\D/, ''); 		// удаление все что не цифры
			}
		});
	};
	//==============================================\\\\\\\calculator======================================================
	calculator(100);


	//======================================================sendForm==========================================================
	// send ajax FORM
	const sendForm = () => {
		let isError = [];														// флаг для отправки формы
		const errorMessage = 'Что то пошло не так',									// выводим на экрам определный текст
			loadMessage = 'Загрузка...',											// выводим на экрам определный текст
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!',					// выводим на экрам определный текст
			placeholderName = 'example "Иван"',
			placeholderPhone = 'example "+79078425469"',
			placeholderEmail = 'example "vika@gmail.com"',
			placeholderMessage = 'Разрешенно вводить только кириллицу, пробелы, цифры и знаки препинания.',
			statusMessage = document.createElement('div'), 							// создаем див для текста
			formInputs = document.querySelectorAll('input[id]');					// получаем инпуты со всех форм
		statusMessage.style.color = 'white';										// белый цвет для текста
		document.querySelector('#form1').appendChild(statusMessage); 				// добовляем на странциу нашь див с текстом


		//======================================================postData==========================================================
		function postData(body, outputData, errorData) {
			const request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}
			});
			request.open('POST', './server.php'); 							// открываем соединение
			request.setRequestHeader('Content-Type', 'application/json');	// создаем заоловок
			request.send(JSON.stringify(body)); 							// получаем данные из формы отправляем запрос
		}
		//==============================================\\\\\\\postData======================================================


		//======================================================checkUserFormElems==========================================================
		document.addEventListener('submit', event => {
			event.preventDefault();									// отключаем стандартную перезакрузку
			const target = event.target; 							// делегирование
			checkUserFormElems(target);
		});
		//==============================================\\\\\\\userFormElems======================================================

		//======================================================checkUserFormElems==========================================================
		function checkUserFormElems(elem) {
			if (elem.id === 'form1') {
				statusMessage.textContent = loadMessage; 			// присваеваем диву текст с loadMessage(загрузка)
			}
			const formData = new FormData(elem);
			const body = {}; 									// создаем обект body
			for (const val of formData.entries()) {				// заполняем обект body нашими элементами
				body[val[0]] = val[1];
			}
			if (!isError.length) {
				postData(body, () => { 								// передаем в функцию postData body и 2 колбек функции
					if (elem.id === 'form1') {
						statusMessage.textContent = successMessage;		// присваеваем диву текст successMessage(выполнено)
					}
					alert('Спасибо! Мы скоро с вами свяжемся!');
					clearInput(elem);
				}, () => {
					if (elem.id === 'form1') {
						statusMessage.textContent = errorMessage;		// присваеваем диву текст errorMessage(ошибка)
					} else {
						alert('Что то пошло не так');
					}
					clearInput(elem);
				});
			} else {
				alert('Поля заполнены не корректно');
			}
		}
		//==============================================\\\\\\\checkUserFormElems======================================================


		//======================================================showBoxShadow==========================================================
		function showBoxShadow(checkBolean, elem) {
			if (checkBolean) {
				isError.push(elem);
				elem.style.boxShadow = '0 0 5px 5px red';
			} else {
				isError = isError.filter(item => item !== elem);
				elem.style.boxShadow = '0 0 5px 5px green';
			}
		}
		//==============================================\\\\\\\showBoxShadow======================================================


		//======================================================formInputs==========================================================
		formInputs.forEach(item => {
			item.setAttribute('autocomplete', 'off');
			item.addEventListener('focus', event => {
				const target = event.target;
				if (target.matches('[name="user_name"]')) {
					target.setAttribute('placeholder', placeholderName);
				}
				if (target.matches('.form-phone')) {
					target.setAttribute('placeholder', placeholderPhone);
				}
				if (target.matches('.form-email')) {
					target.setAttribute('placeholder', placeholderEmail);
				}
				if (target.matches('.mess')) {
					target.setAttribute('placeholder', placeholderMessage);
				}
			});
			item.addEventListener('change', event => {
				const target = event.target;
				if (target.matches('[name="user_name"]')) {
					if (!checkName(target)) {
						item.setAttribute('placeholder', placeholderName);
						showBoxShadow(!checkName(target), target);
					} else {
						target.setAttribute('placeholder', 'Ваше имя');
						showBoxShadow(!checkName(target), target);
					}
				}
				if (target.matches('.form-phone')) {
					if (!checkPhone(target)) {
						target.setAttribute('placeholder', placeholderPhone);
						showBoxShadow(!checkPhone(target), target);
					} else {
						target.setAttribute('placeholder', 'Номер телефона');
						showBoxShadow(!checkPhone(target), target);
					}
				}
				if (target.matches('.form-email')) {
					if (!checkEmail(target)) {
						target.setAttribute('placeholder', placeholderEmail);
						showBoxShadow(!checkEmail(target), target);
					} else {
						target.setAttribute('placeholder', 'E-mail');
						showBoxShadow(!checkEmail(target), target);
					}
				}
				if (target.matches('.mess')) {
					if (!checkMessage(target)) {
						target.setAttribute('placeholder', placeholderMessage);
						showBoxShadow(!checkMessage(target), target);
					} else {
						target.setAttribute('placeholder', 'Ваше сообщение');
						showBoxShadow(!checkMessage(target), target);
					}
				}
			});
		});
		//==============================================\\\\\\\formInputs======================================================


		//======================================================валид==========================================================
		function checkName(elem) {
			elem.value = elem.value.replace(/[a-z0-9?@!,.=_'"/+*)(}{\][|;:\\-]/gi, '');
			return /^[а-яА-Я\s]{3,20}$/.test(elem.value);
		}
		function checkPhone(elem) {
			elem.value = elem.value.replace(/[a-zA-Zа-яА-ЯЁё?@!,.=_'"/*}{\][|;:-]/gi, '');
			return /^\+?\d{11}$/.test(elem.value);
		}
		function checkEmail(elem) {
			elem.value = elem.value.replace(/[а-яА-Я?!,+='"/*)(}{\][|;:\\-]/gi, '');
			return /\w+@\w+\.\w{2,4}$/g.test(elem.value);
		}
		function checkMessage(elem) {
			elem.value = elem.value.replace(/[^а-яА-Я\s!,\\.\\?\d]+/gi, '');
			return /^[а-яА-Я\s\d\\.,!\\?-\\:]{1,}$/g.test(elem.value);
		}
		//==============================================\\\\\\\валид======================================================


		//======================================================clearInput==========================================================
		function clearInput(form) {
			[...form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button').forEach(item => {
				item.value = '';
				item.style.boxShadow = '';
			});
		}
		//==============================================\\\\\\\clearInput======================================================


	};
	//==============================================\\\\\\\sendForm======================================================
	sendForm();
});
//==============================================\\\\\\\DOMContentLoaded======================================================


