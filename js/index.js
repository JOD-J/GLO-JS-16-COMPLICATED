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
let salaryAmountElem = document.querySelector('.salary-amount'), 	// инпут месячный доход (число)
	incomeAmountElem = document.querySelector('.income-amount'),	// инпут дополнительный доход (число)
	expensesAmountElem = document.querySelector('.expenses-amount'),// инпут обязательныйе расходы (число)
	targetAmountElem = document.querySelector('.target-amount'),	// инпут цель (число)
	
	incomeTitleElem = document.querySelector('input.income-title'),							// инпут Дополнительный доход (строка)
	expensesTitleElem = document.querySelector('input.expenses-title'),						// инпут Обязательные расходы (строка)
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
	// ==================================================================constructor=======================================================================================
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
	// ==================================================================constructor=======================================================================================
	// ==================================================================start=======================================================================================
	start () {
		this.budget = +salaryAmountElem.value;
		this.getInfoDeposit();

		this.getExpInc();
		this.getExpensesMonth();

		this.getAddIncExp(additionalExpensesItemElem.value);
		this.getAddIncExp(additionIncomeItemElem);

		this.getBudget();
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
	// ==================================================================start=======================================================================================
	// ==================================================================reset=======================================================================================
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
	// ==================================================================reset=======================================================================================
	// ==================================================================showResult=======================================================================================
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
	// ==================================================================showResult=======================================================================================
	// ==================================================================addIncExpBlock=======================================================================================
	addIncExpBlock(item, button) {
        const cloneItem = item[0].cloneNode(true);
        cloneItem.children[0].value = '';
        cloneItem.children[1].value = '';
        item[0].parentNode.insertBefore(cloneItem, button)
        const startStr = item[0].className.split('-')[0]
        item = document.querySelectorAll(`.${startStr}-items`);
        startStr === 'expenses' ? expensesItemsElem = item : startStr === 'income' ? incomeItemsElem = item : null;
        item.forEach(elem => {
			elem.children[0].addEventListener('input', () => {
				this.checkInputStr(elem.children[0])
			});
            elem.children[1].addEventListener('input', () => {
				this.checkInputNumber(elem.children[1])
			});
        })
        if (item.length === 3) {
            button.style.display = 'none';
        }

    }
	// ==================================================================addIncExpBlock=======================================================================================
	// ==================================================================getExpInc=======================================================================================
	getExpInc () {
		const count = item => {
			const startStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount =  item.querySelector(`.${startStr}-amount`).value;
			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = itemAmount;
			}
		}
		incomeItemsElem.forEach(count);
		expensesItemsElem.forEach(count);
		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	// ==================================================================getExpInc=======================================================================================
	// ==================================================================getAddIncExp=======================================================================================
	getAddIncExp (value) {
        if (typeof value === 'string') {
            const addExpenses = value.split(',');
            addExpenses.forEach(item => {
                item = item.trim();
                if (item) {
                    this.addExpenses.push(item);
                }
            })
        } else {
            value.forEach(item => {
                const itemValue = item.value.trim()
                if (itemValue) {
                    this.addIncome.push(itemValue)
                }
            })
        }

	}
	// ==================================================================getAddIncExp=======================================================================================
	// ==================================================================getExpensesMonth=======================================================================================
	// расходы за месяц (expensesMonth)
	getExpensesMonth () {
		for (let key in this.expenses){
			this.expensesMonth +=  +this.expenses[key];
		}
		console.log(this.expensesMonth);
		return this.expensesMonth;
	}
	// ==================================================================getExpensesMonth=======================================================================================
	// ==================================================================getBudget=======================================================================================
	// доход за месяц минус расходы за месяц (budgetDay)
	getBudget () {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = this.budgetMonth / 30;
	}
	// ==================================================================getBudget=======================================================================================
	// ==================================================================getTargetMonth=======================================================================================

	// за сколько месяцев будет достигнута цель 
	getTargetMonth () {
		return targetAmountElem.value / this.budgetMonth;
	}
	// ==================================================================getTargetMonth=======================================================================================
	// ==================================================================calcSavedMoney=======================================================================================

	// сколько денег мы заработаем за период 
	calcSavedMoney () {
		return this.budgetMonth * periodSelectElem.value;
	}
	// ==================================================================calcSavedMoney=======================================================================================
	// ==================================================================getInfoDeposit=======================================================================================
	getInfoDeposit () {
		if (this.deposit) {
			this.percentDeposit = +depositPercentElem.value ; 
			this.moneyDeposit = depositAmountElem.value;
		}
	}
	// ==================================================================getInfoDeposit=======================================================================================
	// ==================================================================changePercent=======================================================================================
	changePercent () {
		const valueSelect = this.value;
		if (valueSelect === 'other' ) {
			depositAmountElem.removeEventListener ('input', this.changePercent);
			start.disabled = true;
			depositAmountElem.value = '';
			depositPercentElem.value = '';
			depositPercentElem.style.display = 'inline-block';
			if (depositPercentElem.value !== '') {
				start.disabled = false;
			} else {
				start.disabled = true;
			}	
		} else {
			depositPercentElem.style.display = 'none';
			depositPercentElem.value = valueSelect;
		}
		if (valueSelect !== 'other') {
			start.disabled = true;
			if (depositPercentElem !== '' &&  salaryAmountElem.value !== '' ) {
				depositAmountElem.addEventListener('input', () => {
					if (depositAmountElem.value === '' || depositBankElem.value === ''  ) {
						start.disabled = true;
					} else if ( depositPercentElem.value === '') {
						start.disabled = true;
					} else {
						start.disabled = false ;
					}
				});	
			}
			depositAmountElem.value = '';
		} 
	}
	// ==================================================================changePercent=======================================================================================
	// ==================================================================depositHandler=======================================================================================
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
	// ==================================================================depositHandler=======================================================================================
	// ==================================================================salaryAmountDepositCheck=======================================================================================
	salaryAmountDepositCheck() {
		if (depositCheckElem.checked) {
			start.disabled = true;
				depositPercentElem.addEventListener('input', () => {
					this.checkInputNumber(depositPercentElem);
					if (depositPercentElem.value > 100 ){
						alert('Введите корректное значение в поле проценты (1-100)');
						start.disabled = true; 
						depositPercentElem.value = '';
					} else {
						start.disabled = false; 
					}
					if (depositPercentElem.value === '' || salaryAmountElem.value === '' || depositAmountElem.value === '' ) {
						start.disabled = true; 
					}
				});
		} else {
			
			start.disabled = false;
			salaryAmountElem.addEventListener('input', () => {
				if ( salaryAmountElem.value !== '' ) {
					start.disabled = false;
				}  else {
					start.disabled = true ;
					console.log('start.disabled: ', start.disabled);
				}
			});
		}
	}
	// ==================================================================salaryAmountDepositCheck=======================================================================================
	// ==================================================================eventsListeners=======================================================================================
	eventsListeners () {
		start.disabled = true; // блокировка кнопки старт
		salaryAmountElem.addEventListener('input', this.salaryAmountDepositCheck.bind(this));
		depositCheckElem.addEventListener('input', this.salaryAmountDepositCheck.bind(this));
		depositCheckElem.addEventListener('change', this.depositHandler.bind(this));
		// на кнопку старт навешиваем слушатель клик, вызываем функцию start обьекта appData привязываем контекст this с помощью bind для обьекта appData
		start.addEventListener('click', this.start.bind(this));
		// на кнопку сбросить навешиваем слушатель клик, вызываем функцию reset обьекта appData привязываем контекст this с помощью bind для обьекта appData
		cancel.addEventListener('click', this.reset.bind(this));

		// на кнопку + expensesPlusElem навешиваем слушатель клик, вызываем функцию addExpensesBlock обьекта appData 
		expensesPlusElem.addEventListener('click', () => {
			this.addIncExpBlock(expensesItemsElem, expensesPlusElem)
		}); // Обязательные расходы ДИВ для добовление новых инпутов
		
		// на кнопку + incomePlusElem навешиваем слушатель клик, вызываем функцию addIncomeBlock обьекта appData 
		incomePlusElem.addEventListener('click', () => {
			this.addIncExpBlock(incomeItemsElem, incomePlusElem)
		});	// дополнительный доход ДИВ для добовление новых инпутов
		// динамическое изменение инпута период расчета 
		periodSelectElem.addEventListener('input',  () => {
			periodAmountElem.textContent = periodSelectElem.value;
		});
	// ==================================================================строгая првоерка число============================================================================
		salaryAmountElem.addEventListener('input', () => {
            this.checkInputNumber(salaryAmountElem);
		});
		incomeAmountElem.addEventListener('input', () => {
            this.checkInputNumber(incomeAmountElem);
        });
        expensesAmountElem.addEventListener('input', () => {
            this.checkInputNumber(expensesAmountElem);
		});
		targetAmountElem.addEventListener('input', () => {
            this.checkInputNumber(targetAmountElem);
		});
		depositAmountElem.addEventListener('input', () => {
            this.checkInputNumber(depositAmountElem);
		});
	// ==================================================================строгая првоерка число============================================================================
	// ==================================================================строгая првоерка строка============================================================================
		incomeTitleElem.addEventListener('input', () => {
			this.checkInputStr(incomeTitleElem);
		}); 	
		additionIncomeItemElem.forEach(item => {
			item.addEventListener('input', () => {
				this.checkInputStr(item);
			})
		});
		
		expensesTitleElem.addEventListener('input', () => {
            this.checkInputStr(expensesTitleElem);
		});
		additionalExpensesItemElem.addEventListener('input', () => {
			this.checkInputStr(additionalExpensesItemElem);
		});
		
	}
	// ==================================================================строгая првоерка строка============================================================================
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
		if (!parseFloat(n) && n !== null && n.trim() !== '' &&  /[А-Я-\s-,-.-:-;]$/i.test(n)) {
            return true;
        } else {
            return false;
        }
	}
	// двойная проверка на строку 
	checkInputStr(elem) {
		if (!appData.isStr(elem.value)) {
			elem.value = '';
		}
	}
}

const appData = new AppData();

appData.eventsListeners();


