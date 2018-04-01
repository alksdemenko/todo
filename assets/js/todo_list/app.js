import state from './state'
import * as actions from './actions'

export const app = () => {
    const form = document.querySelector('#main-form');
    const textHolder = document.querySelector('#main-text-holder');
    const list = document.querySelector('.todo-list');
    let id = 1;

    function submitMainForm(e) {
        e.preventDefault();
        const inputValue = textHolder.value;

        if (inputValue.length > 0) {
            state.todos.unshift({
                text: inputValue,
                checked: false,
                editMode: false,
                id
            });

            textHolder.value = '';

            updateList();
            id++;
        }
        // actions.addNewToDo(state, {
        //     text: inputValue,
        //     checked: false,
        //     editMode: false,
        //     id
        // })
    }

    function eventListener(type, collection, fn) {
        collection.forEach(elem => {
            const parentId = elem.closest('li').dataset.id;

            elem.addEventListener(type, e => {
                fn(parentId, e)
            })
        })
    }

    function submitTaskForm(id, e) {
        e.preventDefault();
        const newTaskValue = e.target.firstChild.value;

        if (newTaskValue.length > 0) {
            state.todos = state.todos.map(elem => {
                if (elem.id === Number(id)) {
                    elem.text = newTaskValue;
                    elem.editMode = false;
                }
                return elem;
            })
        }

        updateList();
    }

    function removeItem(id) {
        state.todos = state.todos.filter(item => item.id !== Number(id));
        updateList();
    }

    function setItemStatus(id) {
        state.todos = state.todos.map(item => {
            if (item.id === Number(id)) item.checked = !item.checked;
            return item;
        });

        state.todos.forEach(elem => {
            if (elem.checked) {
                const index = state.todos.indexOf(elem);
                state.todos.splice(index, 1);
                state.todos.push(elem);
            }
        })

        updateList();
    }

    function changeTaskName(id) {
        state.todos = state.todos.map(item => {
            if (item.id === Number(id)) item.editMode = true;
            return item;
        });

        updateList();
    }

    function cancelEditing(id) {
        state.todos = state.todos.map(item => {
            if (item.id === Number(id)) item.editMode = false;
            return item;
        });

        updateList();
    }

    function listeners(collection) {
        eventListener("change", collection.checkboxes, setItemStatus);
        eventListener("click", collection.removeButtons, removeItem);
        eventListener("dblclick", collection.taskTexts, changeTaskName);
        eventListener("submit", collection.taskEditingFields, submitTaskForm);
        eventListener("click", collection.cancelButtons, cancelEditing)
    }

    function updateList() {

        const listing = state.todos.map(todo => {
            const checked = todo.checked ? 'checked' : '';
            const completedText = `<s>${todo.text}</s>`;
            const cancelButton = `<input type="button" value="cancel" class="button cancel"/>`;
            const submitButton = `<input class="button save" type="submit" value="save"/>`;
            const editInputText = `<input type="text" class="edit-task-value" value="${todo.text}"/>`;
            const editingMode = `<form class="edit-task">${editInputText}${submitButton}${cancelButton}</form>`;
            const showMode = `<span class="task-text">${todo.text}</span>`;
            const textStyle = todo.checked ? completedText : showMode;
            const task = todo.editMode ? editingMode : textStyle;

            return `<li data-id=${todo.id}><input class="todo-checkbox" type="checkbox" ${checked}>${task}<button class="remove-button"></button></li>`;
        });

        list.innerHTML = listing.join(' ');

        const removeButtons = document.querySelectorAll('.todo-list li .remove-button');
        const checkboxes = document.querySelectorAll('.todo-list li .todo-checkbox');
        const taskTexts = document.querySelectorAll('.todo-list li .task-text');
        const taskEditingFields = document.querySelectorAll('.todo-list li .edit-task');
        const cancelButtons = document.querySelectorAll('.todo-list li .cancel');

        listeners({
            removeButtons,
            checkboxes,
            taskTexts,
            taskEditingFields,
            cancelButtons
        });

        localStorage.setItem('state', JSON.stringify(state));
    }

    form.addEventListener("submit", submitMainForm);
    //
    // function createNewElement(element, options){
    //     const elem = document.createElement(element);
    //     elem.textContent = options.textContent;
    //     elem.className = options.className;
    //
    //     elem.addEventListener(options.event, function(){
    //         options.fn();
    //     });
    //
    //     return elem;
    // };
    //
    //
    // const myButton = createNewElement("button", {
    //     event: "click",
    //     fn: function(){
    //         console.log('rapxidjf')
    //     },
    //     textContent: "click",
    //     className: "button",
    // });

    updateList();

};