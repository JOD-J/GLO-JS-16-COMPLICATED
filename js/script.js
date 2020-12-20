"use strict";

//  функция конструктор описание сущности 
function DomElement (selector, height, width, bg, fontSize, text, position) {
	this.selector = selector;	// создание блока в зависемости от условия . #
	this.height = height;		// высота 
	this.width = width;			// ширина
	this.bg = bg;				// задний фон 
	this.fontSize = fontSize;	// размер шрифта
	this.text = text;			// текст внутри блока
	this.position = position;	// позиция
}

// обращаясь к DomElement создаем новый обьект через метод prototype на основе DomElement(является прототипом самому себе) через метод createElement создаем верстку при условиях 
DomElement.prototype.createElement = function () {
	let elem;
	// в условие если в конструкторе парметр selector через метод slice начиная с 0 индекса по 1 равне .
    if (this.selector.slice(0, 1) === '.') { 
		elem = document.createElement('div');	// создаем на странице тег див 
		elem.id = this.selector.slice(1);		// в атрибуте присваева id 
    }
    //с помощью cssText задавать стили: 
	if (elem) {
		// использую особенности современного es6 из 15 урока
		elem.style.cssText = `
		height : ${this.height}px;
		width : ${this.width}px;
		background-color : ${this.bg};
		font-size : ${this.fontSize}px;
		position : ${this.position};
		top: 0px;
		left: 0px;
		`;
		elem.textContent = this.text;	// добавляем текст
		return elem
	}
};
document.addEventListener('DOMContentLoaded', () => {
    const elem = new DomElement('.div', 100, 100, 'green', 25, 'двигайся', 'absolute').createElement()
    document.body.append(elem)
    document.addEventListener('keydown', (event) => {
        if(event.key === 'ArrowUp'){
            elem.style.top = `${parseFloat(elem.style.top) - 10}px`
        }
        if(event.key === 'ArrowDown'){
            elem.style.top = `${parseFloat(elem.style.top) + 10}px`
        }
        if(event.key === 'ArrowRight'){
            elem.style.left = `${parseFloat(elem.style.left) + 10}px`
        }
        if(event.key === 'ArrowLeft'){
            elem.style.left = `${parseFloat(elem.style.left) - 10}px`
        }
    })
});
