
const wrapperElem = document.querySelector('.wrapper');
const colorElem = document.querySelector('.color');
const btnElem = document.querySelector('.btn');

const changeColor = () => {
	return '#' + Math.floor(Math.random()*16777215).toString(16);
};

const setColor = () =>{
	let newColor = changeColor();
	wrapperElem.style.background = newColor;
	colorElem.textContent = newColor;
}
btnElem.addEventListener('click', setColor);


setColor();