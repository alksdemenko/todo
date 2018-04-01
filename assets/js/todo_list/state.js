// const storage = localStorage.getItem('state');
// const state = storage ? JSON.parse(storage) : {todos: []};

class State {
    constructor() {
        this.subscribers = [];
        this.state = {todos: []};
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    setState(obj) {
        return Object.assign({}, obj, this.state);
    }

    getState(){
        return this.state;
    }

    notify() {
        this.subscribers.forEach(func => func())
    }
}

export default new State();