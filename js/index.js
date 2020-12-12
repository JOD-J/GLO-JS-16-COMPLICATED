"use strict";

const start = document.getElementById('start'),	// кнопка расчитать 
	cancel = document.getElementById('cancel');	// кнопка сбросить

const incomePlusElem = document.getElementsByTagName('button')[0], // кнопка плюсь для Дополнительный доход
	expensesPlusElem = document.getElementsByTagName('button')[1];	// кнопка плюсь для Обязательные расходы

const checkboxElem = document.querySelector('#deposit-check');	// Чекбокс по id через querySelector

// поля ввода (input) с правой стороны
const budgetMonthElem = document.getElementsByClassName('result-total')[0],	// инпут доход за месяц (число)
	budgetDayElem = document.getElementsByClassName('result-total')[1],		// инпут Дневной бюджет (число)
	expensesMonthElem = document.getElementsByClassName('result-total')[2],	// инпут Расход за месяц (число)
	addIncomeElem = document.getElementsByClassName('result-total')[3],		// инпут Возможные доходы (строка)
	addExpensesElem = document.getElementsByClassName('result-total')[4],	// инпут Возможные расходы (строка)
	incomePeriodElem = document.getElementsByClassName('result-total')[5],	// инпут Накопления за период (число)
	targetMonthElem = document.getElementsByClassName('result-total')[6];	// инпут Срок достижения цели в месяцах (число)

// поля ввода (input) с левой стороны
const salaryAmountElem = document.querySelector('.salary-amount'), 	// инпут месячный доход (число)
	incomeAmountElem = document.querySelector('.income-amount'),	// инпут дополнительный доход (число)
	expensesAmountElem = document.querySelector('.expenses-amount'),// инпут обязательныйе расходы (число)
	targetAmountElem = document.querySelector('.target-amount'),	// инпут цель (число)
	
	incomeTitleElem = document.querySelector('.income-title'),							// инпут Дополнительный доход (строка)
	expensesTitleElem = document.querySelector('.expenses-title'),						// инпут Обязательные расходы (строка)
	additionalExpensesItemElem = document.querySelector('.additional_expenses-item'),	// инпут Возможные расходы (строка)

	periodAmountElem = document.querySelector('.period-amount'),	// период расчета ДИВ значение меняется при изменение инпута
	periodSelectElem = document.querySelector('.period-select'),	// инпут периода расчета 

	depositCheckElem = document.querySelector('#deposit-check'),	// инпут чекбокс депозит
	depositAmountElem = document.querySelector('.deposit-amount'),	// инпут сумма 
	depositPercentElem = document.querySelector('.deposit-percent'),// инпут процент
	depositBankElem = document.querySelector('.deposit-bank');		// select банков


let expensesItemsElem = document.querySelectorAll('.expenses-items'),				// Обязательные расходы ДИВ для добовление новых инпутов
	additionIncomeItemElem = document.querySelectorAll('.additional_income-item'),	// инпут возможный доход (строка)
	incomeItemsElem = document.querySelectorAll('.income-items');					// дополнительный доход ДИВ для добовление новых инпутов



//  конструктор AppData
class AppData {

	// проверка на число 
	isNumber (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	// двойная проверка на число 
	checkInputNumber(elem) {
		if (!appData.isNumber(elem.value)) {
			elem.value = '';
		}
	}

	// проверка на строку
	isStr (n) {
		if (!parseFloat(n) && n !== null && n.trim()!== '' &&  /[^А-Я-\s-,-.- :- ;]+$/i.test(n)) {
            return true;
        } else {
            return false;
        }
	}

	// двойная проверка на строку 
	checkInputStr(elem) {
		if (!appData.isString(elem.value)) {
			elem.value = '';
		}
	}

	constructor () {
	this.incomeMonth = 0;	// сумма доп доходов за месяц.
	this.income = {};		// дополнительные доходы обьект.
	this.addIncome = [];	// перечелсенние дополнительных доходов масив.
	this.expenses = {};		// дополнительные рассходы обьект.
	this.addExpenses = [];	// возможные рассходы масив.
	this.deposit = false;	// депозит в банке.
	this.percentDeposit = 0;// процент депозита
	this.moneyDeposit = 0;	// сколько человек денег заложил
	this.budget = 0;		// доход за месяц 
	this.budgetDay = 0;		// бюджет на день в зависемости от дохода и расходов.
	this.budgetMonth = 0;	// бюджет на месяц
	this.expensesMonth = 0;	// расходы за месяц 
	}
	
	start () {
		this.budget = +salaryAmountElem.value;
		this.getExpenses();
		this.getInfoDeposit();
		this.getBudget();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getIncome();
		this.showResult();
	
		//  блокируем все input[type=text] 
		let  input = document.querySelectorAll('input[type=text]');
		input.forEach((item) => {
			item.disabled = true;	 				// блокировка всех инпутов
		});

		depositBankElem.disabled = true;			//	блокирвоака выбора банков
		depositCheckElem.disabled = true;			//	блокирвоака чек бокса 

		start.style.display = 'none';				// кнопка старт пропадает 
		cancel.style.display = 'block'; 			// кнопка расчитать появляется 
		expensesPlusElem.style.display = 'none';	// убираем кнопку плюс 
		incomePlusElem.style.display = 'none';		// убираем кнопку плюс 
	}
	
	// сброс всей программы 
	reset () {
		// разблокируем все input[type=text] 
		let  input = document.querySelectorAll('input[type=text]');
		input.forEach((item) => {
			item.disabled = false;	// сброс  блокировки всех инпутов
			item.value = '';		// очистка всех инпутов 
		});
		
		periodSelectElem.value = 1;			// сброс периода расчета в левом поле инпут
		periodAmountElem.textContent = '1';	// сброс периода расчета в левом поле текст

		start.disabled = true;				// сброс  блокировки всех инпутов

		cancel.style.display = 'none';		// кнопка сбросить пропадет 
		start.style.display = 'block'; 		// кнопка старт появляется 
		
		expensesPlusElem.style.display = 'block';	// возвращаем кнопки плюс 
		incomePlusElem.style.display = 'block';		// возвращаем кнопки плюс 

		depositBankElem.value = '';					// сброс выбора банков
		depositAmountElem.value = '';				// сброс суммы 
		depositPercentElem.value = ''; 				// сброс процентов 

		depositBankElem.style.display = 'none';		// лист банков пропадает 
		depositAmountElem.style.display = 'none';	// инпут вложенная сумма пропадает
		depositPercentElem.style.display = 'none'; 	// инпут проценты пропадет 
		depositCheckElem.checked = false;			// разблакеровка чек бокса
		depositCheckElem.disabled = false;			// разблакеровка чек бокса
		depositBankElem.disabled = false;			// разблакеровка выбора банков

	
		// циклами удаляем  Обязательные расходы блоки ДИВ для добовление новых инпутов
		for (let i = expensesItemsElem.length - 1; i > 0 ; i--){
			expensesItemsElem[i].remove();
		}
		// циклами удаляем  дополнительный доход блоки ДИВ для добовление новых инпутов
		for (let i = incomeItemsElem.length - 1; i > 0 ; i--){
			incomeItemsElem[i].remove();
		}

		// возвращаем все ключи в обект в исходное положение 
		const newAppData = new AppData();
		Object.assign(this, newAppData); // this - Целевой объект. newAppData -Исходные объекты.
	}
	
	// поля данных 
	showResult () {
		periodSelectElem.addEventListener( 'input', () => {
			incomePeriodElem.value = this.calcSavedMoney();	// динамическое изменение инпут Накопления за период
		});
		budgetMonthElem.value = this.budgetMonth;
		budgetDayElem.value = Math.ceil(this.budgetDay);
		expensesMonthElem.value = this.expensesMonth;
		addExpensesElem.value = this.addExpenses.join(', ');
		addIncomeElem.value = this.addIncome.join(', ');
		targetMonthElem.value = Math.ceil(this.getTargetMonth());
		incomePeriodElem.value = this.calcSavedMoney();
		
	}
	
	// добавление дополнительных полей обязательных расходров
	addExpensesBlock () {
		const cloneExpensesItem = expensesItemsElem[0].cloneNode(true);	// создание клона на оснвое expensesItemsElem (ДИВ)
		cloneExpensesItem.children[0].value = '';	// очитка инпутов при добовление новго блока
        cloneExpensesItem.children[1].value = '';	// очитка инпутов при добовление новго блока
		expensesItemsElem[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusElem );
		expensesItemsElem = document.querySelectorAll('.expenses-items');
		if ( expensesItemsElem.length === 3) {
			expensesPlusElem.style.display = 'none';
		}


		expensesItemsElem.forEach(item => {
            item.children[0].addEventListener('input', this.checkInputStr);
            item.children[1].addEventListener('input', this.checkInputNumber);
        });
	}
	
	// добавление дополнительных полей доходов
	addIncomeBlock  () {
		const cloneIncomeItems = incomeItemsElem[0].cloneNode(true);	// создание клона на оснвое incomeItemsElem (ДИВ)
		cloneIncomeItems.children[0].value = '';	// очитка инпутов при добовление новго блока
        cloneIncomeItems.children[1].value = '';	// очитка инпутов при добовление новго блока
		incomeItemsElem[0].parentNode.insertBefore(cloneIncomeItems, incomePlusElem);
		incomeItemsElem = document.querySelectorAll('.income-items');
		if (incomeItemsElem.length === 3) {
			incomePlusElem.style.display = 'none';
		}

		incomeItemsElem.forEach(item => {
            item.children[0].addEventListener('input', this.checkInputStr);
            item.children[1].addEventListener('input',() => {
                this.checkInputNumber(item.children[0]);
            });
        });
	}
	
	 // получение списка обязательных расходов
	getExpenses () {
		expensesItemsElem.forEach((item) => {
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = cashExpenses;
			}
		});
	}
	
	// получение списка дополнительного источника заработка
	getIncome () {
		incomeItemsElem.forEach((item) => {
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = cashIncome;
			}
		});
		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	// значение additionalExpensesItemElem разбивает на масив через метод split через запятую и присваеваеться переменной addExpenses через forEach перебераем масив addExpenses item – очередной элемент массива через метод trim удаляет  пробельные символы с обоих концов строки и через условие если item – очередной элемент массива не пустая строка то пушим в обьект appData методом push в конец масива 
	getAddExpenses () {
		const addExpenses = additionalExpensesItemElem.value.split(', ');
		addExpenses.forEach((item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	}
	
	getAddIncome () {
			additionIncomeItemElem.forEach((item) => {
			const itemVaule = item.value.trim();
			if ( itemVaule !== '' ) {
				this.addIncome.push(itemVaule);
			}
		});
	}
	
	// расходы за месяц (expensesMonth)
	getExpensesMonth () {
		for (let key in this.expenses){
			this.expensesMonth +=  +this.expenses[key];
		}
		return this.expensesMonth;
	}
	
	// доход за месяц минус расходы за месяц (budgetDay)
	getBudget () {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = this.budgetMonth / 30;
	}
	
	// за сколько месяцев будет достигнута цель 
	getTargetMonth () {
		return targetAmountElem.value / this.budgetMonth;
	}
	
	// сколько денег мы заработаем за период 
	calcSavedMoney () {
		return this.budgetMonth * periodSelectElem.value;
	}

	// 
	getInfoDeposit () {
		if (this.deposit) {
			this.percentDeposit = +depositPercentElem.value ; 
			this.moneyDeposit = depositAmountElem.value;
		}
	}

	// 
	changePercent () {
		const valueSelect = this.value;
		if (valueSelect === 'other' ) {
			depositAmountElem.removeEventListener ('input', this.changePercent);
			start.disabled = true;
			console.log('start.disabled: ', start.disabled);
			depositAmountElem.value = '';
			depositPercentElem.value = '';
			depositPercentElem.style.display = 'inline-block';
			if (depositPercentElem.value !== '') {
				start.disabled = false;
				console.log('start.disabled: ', start.disabled);
			} else {
				start.disabled = true;
				console.log('start.disabled: ', start.disabled);
			}	
		} else {
			depositPercentElem.style.display = 'none';
			depositPercentElem.value = valueSelect;
		}
		if (valueSelect !== 'other') {
			start.disabled = true;
			console.log('start.disabled : ', start.disabled );
			if (depositPercentElem !== '' &&  salaryAmountElem.value !== '' ) {
				depositAmountElem.addEventListener('input', () => {
					if (depositAmountElem.value === '' || depositBankElem.value === ''  ) {
						start.disabled = true;
						console.log('start.disabled : ', start.disabled );
					} else if ( depositPercentElem.value === '') {
						start.disabled = true;
						console.log('start.disabled : ', start.disabled );
					} else {
						start.disabled = false ;
						console.log('start.disabled : ', start.disabled );
					}
				});	
			}
			depositAmountElem.value = '';
		} 
	}
	// 
	depositHandler () {
		if (depositCheckElem.checked ) {
			depositBankElem.style.display = 'inline-block';
			depositAmountElem.style.display = 'inline-block';
			this.deposit = true;
			depositBankElem.addEventListener ('change', this.changePercent);
		} else {
			depositBankElem.style.display = 'none';
			depositAmountElem.style.display = 'none';
			depositPercentElem.style.display = 'none';
			depositBankElem.value = '';
			depositAmountElem.value = '';
			depositPercentElem.value = '';
			this.deposit = false;
			depositBankElem.removeEventListener ('change', this.changePercent);
		}
	}
	
	salaryAmountDepositCheck() {
		if (depositCheckElem.checked) {
			start.disabled = true;
			console.log('start.disabled: ', start.disabled);
				depositPercentElem.addEventListener('input', (evt) => {
					const regesp = /^[0-9]+/;
					const prosto = evt.currentTarget.value;
					const checkEstr = prosto.match(regesp);
					depositPercentElem.value = checkEstr ? checkEstr : '';
					if (depositPercentElem.value > 100 ){
						alert('Введите корректное значение в поле проценты (1-100)');
						start.disabled = true; 
						depositPercentElem.value = '';
						console.log('start.disabled: ', start.disabled);
					} else {
						start.disabled = false; 
						console.log('start.disabled: ', start.disabled);
					}
					if (depositPercentElem.value === '' || salaryAmountElem.value === '' || depositAmountElem.value === '' ) {
						start.disabled = true; 
						console.log('start.disabled: ', start.disabled);
					}
				});

		} else {
			start.disabled = false;
			console.log('start.disabled: ', start.disabled);

			salaryAmountElem.addEventListener('input', () => {
				if ( salaryAmountElem.value !== '' ) {
					start.disabled = false;
					console.log('start.disabled: ', start.disabled);
				}  else {
					start.disabled = true ;
					console.log('start.disabled: ', start.disabled);
				}
			});
		}
	}

	// 
	eventsListeners () {

		start.disabled = true; // блокировка кнопки старт
		console.log('start.disabled: ', start.disabled);

		salaryAmountElem.addEventListener('input', this.salaryAmountDepositCheck.bind(this));

		depositCheckElem.addEventListener('input', this.salaryAmountDepositCheck.bind(this));
		depositCheckElem.addEventListener('change', this.depositHandler.bind(this));

		// на кнопку старт навешиваем слушатель клик, вызываем функцию start обьекта appData привязываем контекст this с помощью bind для обьекта appData
		start.addEventListener('click', this.start.bind(this));
	
		// на кнопку сбросить навешиваем слушатель клик, вызываем функцию reset обьекта appData привязываем контекст this с помощью bind для обьекта appData
		cancel.addEventListener('click', this.reset.bind(this));
	
		// на кнопку + expensesPlusElem навешиваем слушатель клик, вызываем функцию addExpensesBlock обьекта appData 
		expensesPlusElem.addEventListener('click', this.addExpensesBlock); // Обязательные расходы ДИВ для добовление новых инпутов
	
		// на кнопку + incomePlusElem навешиваем слушатель клик, вызываем функцию addIncomeBlock обьекта appData 
		incomePlusElem.addEventListener('click', this.addIncomeBlock);	// дополнительный доход ДИВ для добовление новых инпутов
	
		// динамическое изменение инпута период расчета 
		periodSelectElem.addEventListener('input',  () => {
			periodAmountElem.textContent = periodSelectElem.value;
		});

		salaryAmountElem.addEventListener('input', () => {
            this.checkInputNumber(salaryAmountElem);
		});
	}



}

const appData = new AppData();

appData.eventsListeners();


