import Task from './task';

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    newTask(title, desc, dueDate, priority) {
        this.tasks.push(
            new Task(title, desc, dueDate, priority)
        );
    }
}