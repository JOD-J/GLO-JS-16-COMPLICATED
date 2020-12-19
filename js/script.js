'use strict';

class Appear {
	constructor(divElem, inputTextElem, pElem) {
		this.divElem = document.querySelector(divElem);
		this.inputTextElem = document.querySelector(inputTextElem);
		this.pElem = document.querySelector(pElem);
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
	throttle(func) {
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
			}, 1000);
		};
		return wrapper;
	}
	init() {
		this.style();
		const delay = this.throttle(this.assignment.bind(this));
		this.inputTextElem.addEventListener('input', delay);
	}
}
const appear = new Appear('.div', '.input-text', '.p');
appear.init();
