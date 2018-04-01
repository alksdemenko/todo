const storage = localStorage.getItem('state');
const state = storage ? JSON.parse(storage) : {todos: []};

export default state;