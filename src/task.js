import storage from "./storage";

export default class Task {
    constructor(title) {
        this.title = title;
        this.desc = '';
        this.dueDate = null;
        this.priority = 'Low';
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
        storage.populateStorage();
    }
    getDesc() {
        return this.desc;
    }
    setDesc(desc) {
        this.desc = desc;
        storage.populateStorage();
    }
    getDueDate() {
        return this.dueDate;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
        storage.populateStorage();
    }
    getPriority() {
        return this.priority;
    }
    setPriority(priority) {
        this.priority = priority;
        storage.populateStorage();
    }
}