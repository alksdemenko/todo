import state from './state';
import * as actions from './actions'

export default class TodoList {
    constructor() {
        this.form = document.querySelector('#main-form');
        this.textHolder = document.querySelector('#main-text-holder');
        this.list = document.querySelector('.todo-list');
        this.form.addEventListener("submit", (e) => {
            this.addNewTask(e);
            this.notify()
        });
        this.render();
    }

    notify(){
        this.render();
    }

    _setId() {
        return new Date().getTime();
    }

    addNewTask(e) {
        e.preventDefault();
        const inputValue = this.textHolder.value;

        if (inputValue.length > 0) {
            actions.addNewTask({
                text: inputValue,
                checked: false,
                editMode: false,
                id: this._setId()
            });

            this.textHolder.value = '';
        }
    }

    changeTaskName(id, e) {
        e.preventDefault();
        const newTaskValue = e.target.firstChild.value;

        if (newTaskValue.length > 0) {
            actions.changeTaskName(id, newTaskValue);
        }
    }

    removeTask(id) {
        actions.removeTask(id);
    }

    setTaskStatus(id) {
        actions.setTaskStatus(id);
    }

    applyEditingMode(id) {
        actions.applyEditingMode(id);
    }

    cancelEditingMode(id) {
        actions.cancelEditingMode(id);
    }

    render() {
        this.list.innerHTML = '';
        state.todos.forEach(todo => {
            const li = document.createElement('li');

            const listForm = document.createElement('form');
            listForm.className = 'edit-task';

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-task';

            const saveButton = document.createElement('input');
            saveButton.setAttribute('type', 'submit');
            saveButton.setAttribute('value', 'save');
            saveButton.className = 'button save';

            const cancelButton = document.createElement('input');
            cancelButton.setAttribute('value', 'cancel');
            cancelButton.setAttribute('type', 'button');
            cancelButton.className = 'button cancel';

            const textField = document.createElement('input');
            textField.setAttribute('type', 'text');
            textField.setAttribute('value', todo.text);

            const checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.className = 'todo-checkbox';
            todo.checked ? checkBox.setAttribute('checked', todo.checked) : false;
            todo.editMode ? checkBox.setAttribute('disabled', 'disabled') : false;

            const textStyle = todo.checked ? 's' : 'span';

            const taskText = document.createElement(textStyle);
            taskText.className = 'task-text';
            taskText.textContent = todo.text;

            listForm.appendChild(textField);
            listForm.appendChild(saveButton);
            listForm.appendChild(cancelButton);

            const taskContent = !todo.editMode ? taskText : listForm;

            li.appendChild(checkBox);
            li.appendChild(taskContent);
            li.appendChild(removeButton);

            this.list.appendChild(li);

            removeButton.addEventListener('click', () => {
                this.removeTask(todo.id);
                this.notify();
            });
            checkBox.addEventListener('change', () => {
                this.setTaskStatus(todo.id);
                this.notify();
            });
            taskText.addEventListener('dblclick', () => {
                this.applyEditingMode(todo.id);
                this.notify();
            });
            listForm.addEventListener('submit', e => {
                this.changeTaskName(todo.id, e);
                this.notify();
            });
            cancelButton.addEventListener('click', e => {
                this.cancelEditingMode(todo.id, e);
                this.notify();
            })
        });
        localStorage.setItem('state', JSON.stringify(state));
    }
}