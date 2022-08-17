export default class task {
    constructor(title, desc, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
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