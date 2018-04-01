const storage = localStorage.getItem('store');

class State {
    constructor() {
        this.subscribers = [];
        this.state = {
            todos: storage ? JSON.parse(storage) : []
        };
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    setState(obj) {
        this.state = Object.assign({}, this.state, obj);
        this.notify();
    }

    getState(){
        return this.state;
    }

    notify() {
        this.subscribers.forEach(func => func())
    }
}

export default new State();