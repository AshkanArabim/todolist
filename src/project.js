import Task from './task';

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    static allProjects = [];

    static addTask(project) {
        project.newTask(
            prompt('title:'),
            prompt('description:'),
            prompt ('due date:'),
            prompt('priority:')
        );
    }

    static addProject(projectName) {
        let project = new Project(projectName);
        this.allProjects.push(project);
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