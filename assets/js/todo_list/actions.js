import {reducer} from './mutations';

export const addNewTask = task => reducer({type: 'ADD_NEW_TASK', task});
export const removeTask = id => reducer({type: 'REMOVE_TASK', id});
export const setTaskStatus = id => reducer({type: 'SET_TASK_STATUS', id});
export const applyEditingMode = id => reducer({type: 'APPLY_EDITING_MODE', id});
export const cancelEditingMode = id => reducer({type: 'CANCEL_EDITING_MODE', id});
export const changeTaskName = (id, value) => reducer({type: 'CHANGE_TASK_NAME', id, value});