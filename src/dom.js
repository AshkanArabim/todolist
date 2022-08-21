import Project from './project';

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
            this.makeHeaderSection(),
            utils.etc('h2','General'),
            this.makeGeneralSection(),
            utils.etc('h2','Projects'),
            this.makeProjectsSection(),
            dom.makeNewProjectBtn()
            );
        return sidebar;
    }

    static makeHeaderSection() {
        return utils.etc('h1','To Do List','header');
    }

    static makeGeneralSection() {
        const container = utils.etc('div','','general')
        utils.appChildren(
            container,
            this.makeInbox(),
            utils.etc('div','Today','today','select'),
            utils.etc('div','Next 7 Days','7days','select')
        );
        return container;
    }
    
    static makeInbox() {
        const inboxSelector = utils.etc('div','Inbox','inbox','select');
        const inbox = new Project('inbox');

        inboxSelector.addEventListener('click', () => {
            this.renderProject(inbox);
        });

        return inboxSelector;
    }

    static projectBtn(name) {
        return utils.etc('div',name,name,'select');
    }

    static makeProjectsSection() {//this whole section is wrong
        const container = utils.etc('div','','projects');
        
        for (let projectIndex in Project.allProjects) {
            container.appendChild(
                this.projectBtn(Project.allProjects[projectIndex].name)
            );
        }
        
        return container;
    }

    static renderProjectSelectors() {
        const projectSelectorsHolder = utils.qs('.projects')
        const deleteBtn = 
        projectSelectorsHolder.textContent = '';
        for (let projectIndex in Project.allProjects) {
            const project = Project.allProjects[projectIndex];
            const button = this.projectBtn(project.name);
            projectSelectorsHolder.appendChild(button);

            button.addEventListener('click', () => {
                this.renderProject(project);
            })
        }
    }

    static makeNewProjectBtn() {
        const button = utils.etc('div','+','new-btn');
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
            container.appendChild(this.renderTask(project.tasks[task]));
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
        const addTaskBtn = utils.etc('div','+','new-btn');
        addTaskBtn.addEventListener('click', () => {
            Project.addTask(project);
            this.renderProject(project);
        })
        tabTitle.appendChild(addTaskBtn);
        return tabTitle;
    }

    static resetMain() {
        if(utils.qs('main')){utils.qs('main').remove()};
        const main = utils.cr('main');
        main.textContent = '';
        return main;
    }

    static renderTask(task) {
        const container = utils.etc('div','','task');
        const checkbox = utils.cr('input');
        const title = utils.etc('p',`${task.title}`);
        const priority = utils.etc('p',`${task.priority}`);
        const dueDate = utils.etc('p',`${task.dueDate}`);

        checkbox.setAttribute('type','checkbox');

        utils.appChildren(
            container, 
            checkbox,
            title,
            priority,
            dueDate
        )
        return container;
    }
}