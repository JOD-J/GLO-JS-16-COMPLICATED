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

contUsdBtnElem.disabled = true;
// contRubBtnElem.disabled = true;

contUsdSelectElem.addEventListener('change', () => {
	if (contUsdSelectElem.value !== 'select__value') {
		if (contUsdSelectElem.value === 'USD') {
			contUsdBtnElem.disabled = false;
			contUsdTitleUsdElem.textContent = 'Доллар США (USD)';
		} else {
			contUsdTitleUsdElem.textContent = 'Евро США (EUR)';
		}
	} else {
		contUsdBtnElem.disabled = true;
		contUsdTitleUsdElem.textContent = 'Выберите валюту*';
	}
});


const  getRub = () => {
	return fetch('https://api.exchangeratesapi.io/latest', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
		credentials: 'include'
	});
}

getRub();

console.log(getRub());












// const showBlock = () => {

// };
// mainWrapperElem.addEventListener('change', event => {
// 	const target = event.target;
// 	if (target.matches('.container__usdeur-select')) {
// 		if (contUsdSelectElem.value !== 'select__value') {
// 			if (contUsdSelectElem.value === 'USD') {
// 				contUsdTitleUsdElem.textContent = 'Доллар США (USD)';
// 			} else {
// 				contUsdTitleUsdElem.textContent = 'Евро США (EUR)';
// 			}
// 		} else {
// 			contUsdBtnElem.disabled = true;
// 			contUsdTitleUsdElem.textContent = 'Выберите валюту*';
// 		}
// 	}
// 	if (target.matches('.container__rub-select')) {
// 		if (contRubSelectElem.value !== 'select__value') {
// 			contRubBtnElem.disabled = false;
// 			if (contRubSelectElem.value === 'USD') {
// 				contRubTitleUsdElem.textContent = 'Доллар США (USD)';
// 			} else {
// 				contRubTitleUsdElem.textContent = 'Евро США (EUR)';
// 			}
// 		} else {
// 			contRubBtnElem.disabled = true;
// 			contRubTitleUsdElem.textContent = 'Выберите валюту*';
// 		}
// 	}
// });
