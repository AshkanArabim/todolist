import Task from './task';

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    static allProjects = [];

    static addProject(projectName) {
        let project = new Project(projectName);
        this.allProjects.push(project);
    }

    static deleteProject(project) {
        this.allProjects.splice(
            this.allProjects.indexOf(project),1
        );
    }

    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    newTask(title) {
        this.tasks.push(
            new Task(title)
        );
    }
    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
    }
}