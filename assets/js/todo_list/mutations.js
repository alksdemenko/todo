import State from './state';

export const reducer = (action) => {
    switch (action.type) {
        case 'ADD_NEW_TASK':
            console.log(State);
            // let todos = State.getState().todos.unshift(action.task)
            // State.setState({todos});
            break;
        // case 'REMOVE_TASK':
        //     let todos = State.getState().todos.filter(item => item.id !== Number(action.id));
        //     State.setState({todos});
        //     break;
        // case 'APPLY_EDITING_MODE':
        //     state.todos = state.todos.map(item => {
        //         if (item.id === Number(action.id)) item.editMode = true;
        //         return item;
        //     });
        //     break;
        // case 'CANCEL_EDITING_MODE':
        //     state.todos = state.todos.map(item => {
        //         if (item.id === Number(action.id)) item.editMode = false;
        //         return item;
        //     });
        //     break;
        // case 'CHANGE_TASK_NAME':
        //     state.todos = state.todos.map(elem => {
        //         if (elem.id === Number(action.id)) {
        //             elem.text = action.value;
        //             elem.editMode = false;
        //         }
        //         return elem;
        //     })
        //     break;
        // case 'SET_TASK_STATUS':
        //     state.todos = state.todos.map(item => {
        //         if (item.id === Number(action.id)) item.checked = !item.checked;
        //         return item;
        //     });
        //
        //     state.todos.forEach(elem => {
        //         if (elem.checked) {
        //             const index = state.todos.indexOf(elem);
        //             state.todos.splice(index, 1);
        //             state.todos.push(elem);
        //         }
        //         return elem
        //     });
        //     break;
    }
};
