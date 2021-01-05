'use sctrict';

const wrapBtnElem = document.querySelector('.wrap__btn'),
	wrapElem = document.querySelector('.wrap'),
	blockElem = document.querySelector('.block');

let count = 0;
let isMove = false;
let interval;

const move = () => {
	if (count > Number(wrapElem.offsetWidth) - Number(blockElem.offsetWidth)) {
		count = 0;
	}
	count += 1;
	blockElem.style.left = count + 'px';
	interval = requestAnimationFrame(move);
};

const resetAnimation = () => {
	cancelAnimationFrame(interval);
	isMove = false;
	count = 0;
	blockElem.style.left = count + 'px';
};

const startAnimation = () => {
	if (!isMove) {
		interval = requestAnimationFrame(move);
		isMove = true;
	}  else {
		cancelAnimationFrame(interval);
		isMove = false;
	}
};

wrapBtnElem.addEventListener('click', event => {
	const target = event.target;
	if (target.closest('.start__btn')) {
		startAnimation();
	} else if (target.closest('.reset__btn')) {
		resetAnimation();
	}
});
