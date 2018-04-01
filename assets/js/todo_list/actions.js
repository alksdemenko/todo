import {reducer} from './mutations';
import state from './state';

export const addNewTask = (task) => ( reducer(state, {type: 'ADD_NEW_TASK', task}));
export const removeTask = (id) => ( reducer(state, {type: 'REMOVE_TASK', id}));
export const setTaskStatus = (id) => ( reducer(state, {type: 'SET_TASK_STATUS', id}));
export const applyEditingMode = (id) => ( reducer(state, {type: 'APPLY_EDITING_MODE', id}));
export const cancelEditingMode = (id) => ( reducer(state, {type: 'CANCEL_EDITING_MODE', id}));
export const changeTaskName = (id, value) => ( reducer(state, {type: 'CHANGE_TASK_NAME', id, value}));