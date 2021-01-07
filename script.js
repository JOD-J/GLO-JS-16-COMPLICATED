const mainWrapperElem = document.querySelector('.main__wrapper'),
	contUsdElem = document.querySelector('.container__usdeur'),
	contUsdSelectElem = document.querySelector('.container__usdeur-select'),
	contUsdWrapInputElem = document.querySelector('.container__usdeur-wrap__input'),
	contUsdTitleUsdElem = document.querySelector('.container__usdeur-title__usdeur'),
	contUsdTitleRubElem = document.querySelector('.container__usdeur-title__rub'),
	contUsdWrapInputUsdElem = document.querySelector('.container__usdeur-wrap__input-usdeur'),
	contUsdWrapInputRubElem = document.querySelector('.container__usdeur-wrap__input-rub'),
	contUsdBtnElem = document.querySelector('.container__usdeur-btn');

const contRubElem = document.querySelector('.container__rub'),
	contRubSelectElem = document.querySelector('.container__rub-select'),
	contRubWrapInputElem = document.querySelector('.container__rub-wrap__input'),
	contRubTitleRubElem = document.querySelector('.container__rub-title__rub'),
	contRubTitleUsdElem = document.querySelector('.container__rub-title__usdeur'),
	contRubWrapInputRubElem = document.querySelector('.container__rub-wrap__input-rub'),
	contRubWrapInputUsdElem = document.querySelector('.container__rub-wrap__input-usdeur'),
	contRubBtnElem = document.querySelector('.container__rub-btn');


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
contUsdBtnElem.addEventListener('click', () => {
	if (contUsdWrapInputUsdElem.value !== '' && contUsdSelectElem.value === 'USD') {
		contUsdWrapInputRubElem.value = +contUsdWrapInputUsdElem.value * +getUsdRub;
	} else if (contUsdWrapInputUsdElem.value !== '' && contUsdSelectElem.value === 'EUR') {
		contUsdWrapInputRubElem.value = +contUsdWrapInputUsdElem.value * +getEurRub;
	}
});

contRubBtnElem.addEventListener('click', () => {
	if (contRubWrapInputRubElem.value !== '' && contRubSelectElem.value === 'USD') {
		contRubWrapInputUsdElem.value = +contRubWrapInputRubElem.value / +getUsdRub;
	} else if (contRubWrapInputRubElem.value !== '' && contRubSelectElem.value === 'EUR') {
		contRubWrapInputUsdElem.value = +contRubWrapInputRubElem.value / +getEurRub;
	}
});
contUsdBtnElem.disabled = true;
contRubBtnElem.disabled = true;
contUsdSelectElem.addEventListener('change', () => {
	if (contUsdSelectElem.value !== 'select__value') {
		contUsdWrapInputUsdElem.value = '';
		contUsdWrapInputRubElem.value = '';
		if (contUsdSelectElem.value === 'USD') {
			contUsdBtnElem.disabled = false;
			contUsdTitleUsdElem.textContent = 'Доллар США (USD)';
		} else if (contUsdSelectElem.value === 'EUR') {
			contUsdBtnElem.disabled = false;
			contUsdTitleUsdElem.textContent = 'Евро США (EUR)';
		}
	} else {
		contUsdBtnElem.disabled = true;
		contUsdTitleUsdElem.textContent = 'Выберите валюту*';
	}
});
contRubSelectElem.addEventListener('change', () => {
	if (contRubSelectElem.value !== 'select__value') {
		contRubWrapInputRubElem.value = '';
		contRubWrapInputUsdElem.value = '';
		if (contRubSelectElem.value === 'USD') {
			contRubBtnElem.disabled = false;
			contRubTitleUsdElem.textContent = 'Доллар США (USD)';
		} else if (contRubSelectElem.value === 'EUR') {
			contRubBtnElem.disabled = false;

			contRubTitleUsdElem.textContent = 'Евро США (EUR)';
		}
	} else {
		contRubBtnElem.disabled = true;
		contRubTitleUsdElem.textContent = 'Выберите валюту*';
	}
});
