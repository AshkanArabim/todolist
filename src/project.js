import Task from './task';
import storage from './storage';

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    static allProjects = [];

    static addProject(projectName) {
        const allProjs = this.allProjects;
        for (let index in allProjs) {
            if (allProjs[index].name === projectName) {
                alert("Project name can't be duplicate.")
                return
            }
        }
        if(projectName === null) {return}
        let project = new Project(projectName);
        allProjs.push(project);

        storage.populateStorage();
    }

    static deleteProject(project) {
        this.allProjects.splice(
            this.allProjects.indexOf(project),1
        );
        storage.populateStorage();
    }

    static setMethods() {
        for (let projectIndex in this.allProjects) {
            const project = this.allProjects[projectIndex];

            project.getName = function(name) {
                return this.name;
            }
    
            project.setName = function(name) {
                if(title === null) {return}
                this.name = name;
                storage.populateStorage();
            }
    
            project.newTask = function(title) {
                if(title === null) {return}
                this.tasks.push(
                    new Task(title)
                );
                storage.populateStorage();
            }
    
            project.deleteTask = function(task) {
                const index = this.tasks.indexOf(task);
                this.tasks.splice(index, 1);
                storage.populateStorage();
            }
            
            for (let taskIndex in project.tasks) {
                const task = project.tasks[taskIndex];
                console.log('the tasks:');
                console.log(task);

                task.getTitle = function() {
                    return this.title;
                }
                task.setTitle = function(title) {
                    this.title = title;
                    storage.populateStorage();
                }
                task.getDesc = function() {
                    return this.desc;
                }
                task.setDesc = function(desc) {
                    this.desc = desc;
                    storage.populateStorage();
                }
                task.getDueDate = function() {
                    return this.dueDate;
                }
                task.setDueDate = function(dueDate) {
                    this.dueDate = dueDate;
                    storage.populateStorage();
                }
                task.getPriority = function() {
                    return this.priority;
                }
                task.setPriority = function(priority) {
                    this.priority = priority;
                    storage.populateStorage();
                }
            }
        }
    }

    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
        storage.populateStorage();
    }
    newTask(title) {
        if(title === null) {return}
        this.tasks.push(
            new Task(title)
        );
        storage.populateStorage();
    }
    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        storage.populateStorage();
    }
}