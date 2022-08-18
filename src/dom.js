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
            dom.makeSidebar()
        );
    }

    static makeSidebar() {
        const sidebar = utils.cr('aside');
        utils.appChildren(
            sidebar,
            dom.makeHeaderSection(),
            utils.etc('h2','General'),
            dom.makeGeneralSection(),
            utils.etc('h2','Projects'),
            dom.makeProjectsSection()
            );
        return sidebar;
    }

    static makeHeaderSection() {
        return utils.etc('div','To do list','header');
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
        //to be removed
        const inbox = new Project('inbox');
        inbox.newTask('test','just a test','tomorrow','high');
        inbox.newTask('test2','another test','tomorrow','high');
        inbox.newTask('test2','another test','tomorrow','high');
        console.log(inbox);

        inboxSelector.addEventListener('click', () => {
            this.renderProject(inbox);
        });
        //to be removed

        return inboxSelector;
    }

    static makeProjectsSection() {
        const container = utils.etc('div','','projects');
        const projectCreatorButton = utils.etc('button','New Project','new-project')
        utils.appChildren(
            container,
            //this section to be automated
            utils.etc('div','sample','sample','select'),
            utils.etc('div','sample','sample','select'),
            //this section to be automated
            projectCreatorButton
        )
        return container;
    }

    static renderProject(project) {
        const main = this.resetMain();
        const container = utils.etc('div','','taskholder');
        for (let task in project.tasks) {
            container.appendChild(this.renderTask(project.tasks[task]));
        }
        main.appendChild(container);
        utils.appChildren(
            utils.qs('body'),
            main
        )
    }

    static resetMain() {
        if(utils.qs('main')){utils.qs('main').remove()};
        const main = utils.cr('main');
        console.log(main)
        main.textContent = '';
        return main;
    }

    static renderTask(task) {
        const container = utils.etc('div','','task');
        const checkbox = utils.cr('input');
        const title = utils.cr('h6');

        checkbox.setAttribute('type','checkbox');
        title.textContent = `${task.title}`;

        utils.appChildren(
            container, 
            checkbox,
            title
        )
        return container;
    }
}