'use strict';

class Throttling {
	constructor(divThrottlingElem, inputThrottlingTextElem, pThrottlingElem) {
		this.divElem = document.querySelector(divThrottlingElem);
		this.inputTextElem = document.querySelector(inputThrottlingTextElem);
		this.pElem = document.querySelector(pThrottlingElem);
	}
	style() {
		this.divElem.style.border = '1px solid silver';
		this.divElem.style.padding = '10px';
		this.divElem.style.marginBottom = '10px';
		this.pElem.style.border = '1px solid silver';
		this.pElem.style.padding = '10px';
	}
	assignment() {
		this.pElem.textContent = this.inputTextElem.value;
	}
	throttling(func, ms) {
		let isThrottled = false,
			savedArgs,
			savedThis;
		const wrapper = () => {
			if (isThrottled) {
				savedArgs = arguments;
				savedThis = this;
				return;
			}
			func.apply(this, arguments);
			isThrottled = true;
			setTimeout(() => {
				isThrottled = false;
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = savedThis = null;
				}
			}, ms);
		};
		return wrapper;
	}
	init() {
		this.style();
		const delay = this.throttling(this.assignment.bind(this), 1000);
		this.inputTextElem.addEventListener('input', delay);
	}
}
const throttling = new Throttling('.wrap__throttling', '.input__text-throttling', '.p__throttling');
throttling.init();

class Debouncing {
	constructor(divDebouncingElem, inputDebouncingTextElem, pDebouncingElem) {
		this.divElem = document.querySelector(divDebouncingElem);
		this.inputTextElem = document.querySelector(inputDebouncingTextElem);
		this.pElem = document.querySelector(pDebouncingElem);
	}
	style() {
		this.divElem.style.border = '1px solid silver';
		this.divElem.style.padding = '10px';
		this.pElem.style.border = '1px solid silver';
		this.pElem.style.padding = '10px';
	}
	assignment() {
		this.pElem.textContent = this.inputTextElem.value;
	}
	debouncing(func, ms) {
		let timeout;
		return function() {
			const fnCall = () => { func.apply(this, arguments); };
			clearTimeout(timeout);
			timeout = setTimeout(fnCall, ms);
		};
	}
	init() {
		this.style();
		const delay = this.debouncing(this.assignment.bind(this), 500);
		this.inputTextElem.addEventListener('input', delay);
	}
}
const debouncing = new Debouncing('.wrap__debouncing', '.input__text-debouncing', '.p__debouncing');
debouncing.init();
