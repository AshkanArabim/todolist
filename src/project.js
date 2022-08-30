import Task from './task';

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    static allProjects = [];

    static addProject(projectName) {
        const ap = this.allProjects;
        for (let pi in ap) {
            if (ap[pi].name === projectName) {
                alert("Project name can't be duplicate.")
                return
            }
        }
        if(projectName === null) {return}
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
        if(title === null) {return}
        this.tasks.push(
            new Task(title)
        );
    }
    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
    }
}