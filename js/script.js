/* eslint-disable max-len */
'use strict';

//==================================================Todo===================================================
class Todo {
	//==================================================constructor===================================================
	constructor(form, input, todoList, todoCompleted, todoContainer) { // принимаем элементы со страницы
		// создаем свойсвто
		this.form = document.querySelector(form);						// получаем элементы со страницы
		this.input = document.querySelector(input);						// получаем элементы со страницы
		this.todoList = document.querySelector(todoList);				// получаем элементы со страницы не выполненый Todo
		this.todoCompleted = document.querySelector(todoCompleted);		// получаем элементы со страницы выполненый Todo
		this.todoContainer = document.querySelector(todoContainer);		// получаем элементы со страницы контейнер Todo
		this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList'))); 	// создаем колекцию
	}
	//==========================================\\\\\\constructor====================================================


	//==================================================addTodo===================================================
	addTodo(event) {
		event.preventDefault();
		if (this.input.value.trim()) { 								// при условии если инпут не пустой выполняем код
			const newTodo = { 										// создаем дело с 3 параметрами
				value: this.input.value, 							// получение текста
				completed: false, 									// выполнено или нет дело
				key: this.generateKey(), 							// ключ индефекатор
			};
			this.input.value = ''; 									// отчищаем ипут
			this.todoData.set(newTodo.key, newTodo); 				// добовляем в колекцию дело
			this.render(); 											// render перебор
		} else {													// добовление пустого дела
			alert('пустое дело добавить нельзя!');
		}
	}
	//==========================================\\\\\\addTodo====================================================


	//==================================================generateKey===================================================
	generateKey() {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}
	//==========================================\\\\\\generateKey====================================================


	//==================================================render===================================================
	render() {
		this.todoList.textContent = '';					// очистка стандартной верстки
		this.todoCompleted.textContent = '';			// очистка стандартной верстки
		this.todoData.forEach(this.createItem, this); 	// перебор todoData всех элементом функции createItem
		this.addToStorage();
	}
	//==========================================\\\\\\render====================================================


	//==================================================createItem===================================================
	createItem(todo) {
		const li = document.createElement('li'); 				// создаем li
		li.classList.add('todo-item'); 							// присваеваем li класс
		// выводим в верстку
		li.key = todo.key;
		li.insertAdjacentHTML('beforeend', ` 
			<span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-edit"></button>
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
				<div></div>
		`);
		if (todo.completed) {									// false true
			this.todoCompleted.prepend(li);						// выполненый список Todo
		} else {
			this.todoList.prepend(li);							// не выполненый список Todo
		}
	}
	//==========================================\\\\\\createItem====================================================

	//==================================================addToStorage===================================================
	addToStorage() { 																// отправка в LocalStorage
		localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
	}
	//==========================================\\\\\\addToStorage====================================================


	//==================================================handler===================================================
	handler() {
		this.todoContainer.addEventListener('click', event => {
			event.preventDefault(); 										// отмена действие по умолчанию
			const target = event.target;									// target = элементу html
			console.log('target: ', target);
			if (target.matches('.todo-remove')) {							// если клик класс .todo-remove вызов deleteItem
				this.deleteItem(target.parentElement);						//
			} else if (target.matches('.todo-complete')) {					// если клик класс .todo-complete вызов completedItem
				this.completedItem(target.parentElement);					//
			} else if (target.matches('.todo-edit')) {						//
				this.editing(target.parentElement);							// если клик класс ..todo-edit вызов editing
			}
		});
	}
	//==========================================\\\\\\handler====================================================


	//==================================================editing===================================================
	editing(element) {
		element.parentElement.firstElementChild.contentEditable = 'true';
		element.parentElement.firstElementChild.focus();
		element.parentElement.firstElementChild.addEventListener('blur', () => {
			if (element.parentElement.firstElementChild.textContent) {
				this.todoData.forEach(item => {
					if (item.key === element.parentElement.key) {
						item.value = element.parentElement.firstElementChild.textContent;
					}
				});
				element.parentElement.firstElementChild.contentEditable = 'false';
				this.render();
			} else {
				element.parentElement.lastElementChild.style.color = 'red';
				element.parentElement.lastElementChild.textContent = 'пустое дело добавить нельзя! напишишите чтони-будь';
				element.parentElement.firstElementChild.focus();
			}
		});
		// https://learn.javascript.ru/focus-blur
		// https://learn.javascript.ru/dom-navigation#navigatsiya-tolko-po-elementam
	}
	//==========================================\\\\\\editing====================================================


	//==================================================deleteItem===================================================
	deleteItem(element) {
		element.parentElement.style.transform = `translate(-100%)`;
		let count  = 0;
		const go = () => {
			count += 2;
			element.parentElement.style.left = `${count}%`;
			const animate = requestAnimationFrame(go);
			if (count  === 220) {
				cancelAnimationFrame(animate);
				this.todoData.delete(element.parentElement.key);
				this.render();
			}
		};
		requestAnimationFrame(go);
	}
	//==========================================\\\\\\deleteItem====================================================


	//==================================================completedItem===================================================
	completedItem(element) {
		// console.log('element: ', element);
		// console.log('element.children: ', element.children);
		// console.log('element.children[0]: ', element.children[0]);
		// console.log('element.children[1]: ', element.children[1]);
		// console.log('element.children[2]: ', element.children[2]);
		// console.log('element.children[3]: ', element.children[3]);
		// console.log('element.firstElementChild: ', element.firstElementChild);
		// console.log('element.lastElementChild: ', element.lastElementChild);
		// console.log('element.previousElementSibling: ', element.previousElementSibling);
		// console.log('element.nextElementSibling : ', element.nextElementSibling);
		// console.log('element.parentElement: ', element.parentElement);
		// console.log('element.parentElement.children: ', 	element.parentElement.children);
		// console.log('element.parentElement.children[0]: ', 	element.parentElement.children[0]);
		// console.log('element.parentElement.children[1]: ', 	element.parentElement.children[1]);
		// console.log('element.parentElement.children[2]: ', 	element.parentElement.children[2]);
		// console.log('element.parentElement.firstElementChild: ', element.parentElement.firstElementChild);
		// console.log('element.parentElement.lastElementChild: ', element.parentElement.lastElementChild);
		// console.log('element.parentElement.previousElementSibling: ', element.parentElement.previousElementSibling);
		// console.log('element.parentElement.nextElementSibling: ', element.parentElement.nextElementSibling);
		element.parentElement.style.transform  = `translate(-100%)`;
		let count  = 0;
		const go = () => {
			count += 2;
			element.parentElement.style.left = `${count}%`;
			const animate = requestAnimationFrame(go);
			if (count  === 220) {
				cancelAnimationFrame(animate);
				this.todoData.forEach(item => {
					if (item.key === element.parentElement.key) {
						item.completed = !item.completed;
					}
				});
				this.render();
			}
		};
		requestAnimationFrame(go);
	}
	//==========================================\\\\\\completedItem====================================================


	//==================================================init===================================================
	init() {
		this.form.addEventListener('submit', this.addTodo.bind(this));	// на форму навешиваем слушатель submit, вызываем функцию addTodo
		this.render();
		this.handler();
	}
	//==========================================\\\\\\init====================================================
}
//==========================================\\\\\\Todo====================================================
// получаем элементы со страницы передаем  их в Todo
const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init();
