const  mainWrapperElem = document.querySelector('.main__wrapper'),
	wrapEurElem = document.querySelector('.wrap__eur'),
	eurSelectElem = document.querySelector('.wrap__eur-select'),
	eurInputElem = document.querySelector('.eur__input'),
	showEurInputElem = document.querySelector('.showeur__input'),
	setEurElem = document.querySelector('.set__eur'),
	eurBtnElem = document.querySelector('.wrap__eur-btn'),
	wrapRubElem = document.querySelector('.wrap__rub'),
	rubSelecElem = document.querySelector('.wrap__rub-selec'),
	rubInputElem = document.querySelector('.rub__input'),
	showrubInputElem = document.querySelector('.showrub__input'),
	getRubElem = document.querySelector('.get__rub'),
	rubBtnElem = document.querySelector('.wrap__rub-btn');

eurBtnElem.disabled = true;
rubBtnElem.disabled = true;

let getEurRub;
let getUsdRub;

const  getUsd = () => {
	fetch('https://api.exchangeratesapi.io/latest?base=USD', {
		method: 'GET',
		mode: 'cors',
	})
		.then(response => {
			if (response.status !== 200) {
				throw new Error('status network mot 200');
			}
			return (response.json());
		})
		.then(response => {
			getUsdRub = response.rates.RUB;
		})
		.catch(error => {
			console.log('error: ', error);
		});
};


const  getEur = () => {
	fetch('https://api.exchangeratesapi.io/latest?base=EUR', {
		method: 'GET',
		mode: 'cors',
	})
		.then(response => {
			if (response.status !== 200) {
				throw new Error('status network mot 200');
			}
			return (response.json());
		})
		.then(response => {
			getEurRub = response.rates.RUB;
		})
		.catch(error => {
			console.log('error: ', error);
		});
};


getUsd();
getEur();


const clearInputEur = () => {
	eurInputElem.value = '';
	showEurInputElem.value = '';
};


const clearInputRub = () => {
	rubInputElem.value = '';
	showrubInputElem.value = '';
};


const showStyle = elem => {
	switch (elem.value) {
	case 'select__value':
		if (elem.matches('.wrap__eur-select')) {
			setEurElem.textContent = 'Выберите валюту*';
			eurBtnElem.disabled = true;
			clearInputEur();
		} else {
			getRubElem.textContent = 'Выберите валюту*';
			rubBtnElem.disabled = true;
			clearInputRub();
		}
		break;
	case 'USD':
		if (elem.matches('.wrap__eur-select')) {
			setEurElem.textContent = 'Доллар США (USD)';
			eurBtnElem.disabled = false;
			clearInputEur();
		} else {
			getRubElem.textContent = 'Доллар США (USD)';
			rubBtnElem.disabled = false;
			clearInputRub();
		}
		break;
	case 'EUR':
		if (elem.matches('.wrap__eur-select')) {
			setEurElem.textContent = 'Евро США (EUR)';
			eurBtnElem.disabled = false;
			clearInputEur();
		} else {
			getRubElem.textContent = 'Евро США (EUR)';
			rubBtnElem.disabled = false;
			clearInputRub();
		}
		break;
	}
};


const showResult = (elem, select) => {
	switch (select.value) {
	case 'USD':
		if (elem.parentElement.matches('.wrap__eur')) {
			showEurInputElem.value = (+eurInputElem.value * +getUsdRub).toFixed(2);
		} else if (elem.parentElement.matches('.wrap__rub')) {
			showrubInputElem.value = (+rubInputElem.value / +getUsdRub).toFixed(2);
		}
		break;
	case 'EUR':
		if (elem.parentElement.matches('.wrap__eur')) {
			showEurInputElem.value = (+eurInputElem.value * +getEurRub).toFixed(2);
		} else if (elem.parentElement.matches('.wrap__rub')) {
			showrubInputElem.value = (+rubInputElem.value / +getEurRub).toFixed(2);
		}
		break;
	}
};


mainWrapperElem.addEventListener('click', event => {
	const target = event.target;
	if (target.matches('button')) {
		showResult(target, target.parentElement.children[0].closest('select'));
	}
});


mainWrapperElem.addEventListener('change', event => {
	const target = event.target;
	if (target.matches('select')) {
		showStyle(target);
	}
});
