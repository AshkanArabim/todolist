import Project from './project';
import storage from './storage';

class utils {
    static cr(element) {return document.createElement(element);}
    static qs(query) {return document.querySelector(query);}
    static appChildren(parent) {
        for (let i=1; i<=arguments.length-1; i++) {
            parent.appendChild(arguments[i]);
        }
    }
    static etc(element, text) {
        const product = this.cr(element);
        product.textContent = text;
        if(arguments[2]){
            for (let i = 2; i<arguments.length; i++) {
                product.classList.add(arguments[i]);
            }
        };
        return product;
    }
}

export default class dom {
    static render() {
        storage.checkStorage();
        const body = utils.qs('body');
        utils.appChildren(
            body,
            this.makeSidebar()
        );
    }

    static makeSidebar() {
        const sidebar = utils.cr('aside');
        const ProjectSelectorHolder = utils.etc('div','','projects');
        this.renderProjectSelectors(ProjectSelectorHolder);
        utils.appChildren(
            sidebar,
            utils.etc('h1','To Do List','header'),
            utils.etc('h2','Projects'),
            ProjectSelectorHolder,
            this.makeAddProjectBtn()
            );
        return sidebar;
    }

    static projectBtn(project) {
        const button = utils.etc('div','','project');
        const projectSelector = utils.etc('button',`${project.name}`,'show-project');
        const deleteProject = utils.etc('button','×','delete-project');
        deleteProject.addEventListener('click', () => {
            Project.deleteProject(project)
            this.resetMain();
            this.renderProjectSelectors();
        })
        projectSelector.addEventListener('click', () => {
            this.renderProject(project);
        })
        utils.appChildren(
            button,
            projectSelector,
            deleteProject
        )
        return button;
    }

    static renderProjectSelectors(holder) {
        if(holder === undefined){holder = utils.qs('.projects')}
        holder.textContent = '';
        for (let projectIndex in Project.allProjects) {
            const project = Project.allProjects[projectIndex];
            const button = this.projectBtn(project);
            holder.appendChild(button);
        }
    }

    static makeAddProjectBtn() {
        const button = utils.etc('button','+','new-btn');
        button.addEventListener('click', () => {
            Project.addProject(
                prompt('Enter project name: ')
            );
            this.renderProjectSelectors();
            
        })
        return button;
    }

    static renderProject(project) {
        const main = this.resetMain();
        const container = utils.etc('div','','taskholder');
        for (let task in project.tasks) {
            container.appendChild(this.renderTask(project.tasks[task], project));
        }
        utils.appChildren(
            main,
            this.makeTabTitle(project),
            container
        )
        utils.qs('body').appendChild(main);
    }

    static makeTabTitle(project) {
        const tabTitle = utils.etc('h1',`${project.name}`,'tab-title');
        const btnContainer = utils.etc('span','','btn-container')
        const addTaskBtn = utils.etc('button','+','new-btn');
        addTaskBtn.addEventListener('click', () => {
            project.newTask(prompt('title:'));
            this.renderProject(project);
        });
        btnContainer.appendChild(addTaskBtn);
        tabTitle.appendChild(btnContainer);
        return tabTitle;
    }

    static resetMain() {
        if(utils.qs('main')){utils.qs('main').remove()};
        const main = utils.cr('main');
        main.textContent = '';
        return main;
    }

    static renderTask(task, project) {
        const container = utils.etc('div','','task');
        const taskShort = utils.etc('div','','task-short');
        const dataHolder = utils.etc('div','','task-data');
        const taskExpanded = utils.etc('div','','task-expanded');
        
        const checkbox = utils.cr('input');
        checkbox.setAttribute('type','checkbox');

        const title = utils.etc('p',`${task.getTitle()}`);
        const description = utils.etc('textarea',`${task.getDesc()}`,'task-desc');
        const priority = utils.etc('p','Priority: ','task-priority');

        const deleteBtn = utils.etc('button','🗑️','new-btn','task-delete-btn');
        const expandBtn = utils.etc('button','↓','new-btn');

        if (task.getPriority() === 'High') {
            title.classList.add('red');
        } else {
            title.classList.remove('red');
        }

        expandBtn.addEventListener('click', () => {
            taskExpanded.classList.toggle('show');
        })

        deleteBtn.addEventListener('click', () => {
            project.deleteTask(task);
            this.renderProject(project);
        })

        description.addEventListener('input', () => {
            task.setDesc(description.value);
        })

        utils.appChildren(
            priority,
            this.makePrioritySelector(task, title)
        )
        utils.appChildren(
            dataHolder,
            title,
            this.makeDueDateSelector(task)
        )
        utils.appChildren(
            taskShort,
            checkbox,
            dataHolder,
            expandBtn
        )
        utils.appChildren(
            taskExpanded,
            priority,
            description,
            deleteBtn
        )
        utils.appChildren(
            container,
            taskShort,
            taskExpanded
        )
        return container;
    }

    static makePrioritySelector(task, title){
        const prioritySelect = utils.etc('select','');
        const optionLow = utils.etc('option','Low');
        optionLow.value = 'Low';
        const optionHigh = utils.etc('option','High');
        optionHigh.value = 'High';

        utils.appChildren(
            prioritySelect,
            optionLow,
            optionHigh
        )

        prioritySelect.value = task.getPriority();
        
        prioritySelect.addEventListener('input', () => {
            task.setPriority(prioritySelect.value);

            if (task.getPriority() === 'High') {
                title.classList.add('red');
            } else {
                title.classList.remove('red');
            }
        })

        return prioritySelect;
    }

    static makeDueDateSelector(task) {
        const dueDate = utils.etc('input','');
        dueDate.setAttribute('type','date');
        dueDate.value = task.getDueDate();

        dueDate.addEventListener('input', () => {
            task.setDueDate(dueDate.value);
        })

        return dueDate;
    }
}