export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NEW_TASK':
            state.todos.unshift(action.task);
            break;
        case 'REMOVE_TASK':
            state.todos = state.todos.filter(item => item.id !== Number(action.id));
            break;
        case 'APPLY_EDITING_MODE':
            state.todos = state.todos.map(item => {
                if (item.id === Number(action.id)) item.editMode = true;
                return item;
            });
            break;
        case 'CANCEL_EDITING_MODE':
            state.todos = state.todos.map(item => {
                if (item.id === Number(action.id)) item.editMode = false;
                return item;
            });
            break;
        case 'CHANGE_TASK_NAME':
            state.todos = state.todos.map(elem => {
                if (elem.id === Number(action.id)) {
                    elem.text = action.value;
                    elem.editMode = false;
                }
                return elem;
            })
            break;
        case 'SET_TASK_STATUS':
            state.todos = state.todos.map(item => {
                if (item.id === Number(action.id)) item.checked = !item.checked;
                return item;
            });

            state.todos.forEach(elem => {
                if (elem.checked) {
                    const index = state.todos.indexOf(elem);
                    state.todos.splice(index, 1);
                    state.todos.push(elem);
                }
                return elem
            });
            break;
    }
};
