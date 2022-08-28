import Project from './project';
import trashcan from './assets/trashcan.svg'

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
        const body = utils.qs('body');
        utils.appChildren(
            body,
            this.makeSidebar()
        );
    }

    static makeSidebar() {
        const sidebar = utils.cr('aside');
        utils.appChildren(
            sidebar,
            utils.etc('h1','To Do List','header'),
            utils.etc('h2','General'),
            this.makeGeneralSection(),
            utils.etc('h2','Projects'),
            utils.etc('div','','projects'),
            this.makeAddProjectBtn()
            );
        return sidebar;
    }

    static makeGeneralSection() {
        const container = utils.etc('div','','general')
        utils.appChildren(
            container,
            this.makeInbox(),
            utils.etc('button','Today','today','select'),
            utils.etc('button','Next 7 Days','7days','select')
        );
        return container;
    }
    
    static makeInbox() {
        const inboxSelector = utils.etc('button','Inbox','inbox','select');
        const inbox = new Project('inbox');

        inboxSelector.addEventListener('click', () => {
            this.renderProject(inbox);
        });

        return inboxSelector;
    }

    static projectBtn(project) {
        const button = utils.etc('button',project.name,'select', 'project');
        const deleteBtn = utils.etc('span','','delete-project');
        deleteBtn.addEventListener('click', () => {
            Project.deleteProject(project)
            this.resetMain();
            this.renderProjectSelectors();
        })
        button.appendChild(deleteBtn);
        return button;
    }

    static renderProjectSelectors() {
        const projectSelectorsHolder = utils.qs('.projects')
        projectSelectorsHolder.textContent = '';
        for (let projectIndex in Project.allProjects) {
            const project = Project.allProjects[projectIndex];
            const button = this.projectBtn(project);
            projectSelectorsHolder.appendChild(button);

            button.addEventListener('click', () => {
                this.renderProject(project);
            })
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
        const checkbox = utils.cr('input');
        const dataHolder = utils.etc('div','','task-data');
        const title = utils.etc('p',`${task.title}`);
        const priority = utils.etc('p',`${task.priority}`);
        const dueDate = utils.etc('p',`${task.dueDate}`);
        const expandBtn = utils.etc('button','↓','new-btn');

        checkbox.setAttribute('type','checkbox');

        // expandBtn.addEventListener('click', () => {
        //     project.removeTask(task);
        //     this.renderProject(project);
        // })

        utils.appChildren(
            dataHolder,
            title,
            dueDate
        )

        utils.appChildren(
            container,
            dataHolder,
            expandBtn
        )
        return container;
    }
}