export default class Task {
    constructor(title) {
        this.title = title;
        this.desc = '';
        this.dueDate = null;
        this.priority = 'low';
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getDesc() {
        return this.desc;
    }
    setDesc(desc) {
        this.desc = desc;
    }
    getDueDate() {
        return this.dueDate;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    getPriority() {
        return this.priority;
    }
    setPriority(priority) {
        this.priority = priority;
    }
}