import State from './state';

export const reducer = (action) => {
    switch (action.type) {
        case 'ADD_NEW_TASK':
            let todos = State.getState().todos;
            todos.unshift(action.task);
            State.setState({'todos': todos});
            break;

        case 'REMOVE_TASK':
            State.setState({todos: State.getState().todos.filter(item => item.id !== Number(action.id))});
            break;

        case 'APPLY_EDITING_MODE':

            State.setState({
                todos: State.getState().todos.map(item => {
                    if (item.id === Number(action.id)) item.editMode = true;
                    return item;
                })
            });
            break;

        case 'CANCEL_EDITING_MODE':
            State.setState({
                todos: State.getState().todos.map(item => {
                    if (item.id === Number(action.id)) item.editMode = false;
                    return item;
                })
            })
            break;

        case 'CHANGE_TASK_NAME':
            State.setState({
                todos: State.getState().todos.map(elem => {
                    if (elem.id === Number(action.id)) {
                        elem.text = action.value;
                        elem.editMode = false;
                    }
                    return elem;
                })
            })
            break;

        case 'SET_TASK_STATUS':
            let checkedTasks = State.getState().todos.map(item => {
                if (item.id === Number(action.id)) item.checked = !item.checked;
                return item;
            });

            checkedTasks.forEach(elem => {
                if (elem.checked) {
                    const index = checkedTasks.indexOf(elem);
                    checkedTasks.splice(index, 1);
                    checkedTasks.push(elem);
                }
            });

            State.setState({todos: checkedTasks});
            break;
    }
};
