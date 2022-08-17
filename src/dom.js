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
    static renderSkeleton() {
        const body = utils.qs('body');
        utils.appChildren(
            body,
            dom.makeSidebar(),
            dom.makeMain()
        );
    }

    static makeSidebar() {
        const sidebar = utils.cr('aside');
        utils.appChildren(
            sidebar,
            dom.makeHeaderSection(),
            dom.makeGeneralSection(),
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
            utils.etc('div','Inbox','inbox','select'),
            utils.etc('div','Today','today','select'),
            utils.etc('div','Next 7 Days','7days','select')
        );
        return container;
    }

    static makeProjectsSection() {
        const container = utils.etc('div','','projectsholder');
        const containerTitle = utils.etc('h2','Projects');
        const projectCreatorButton = utils.etc('button','New Project','new-project')
        utils.appChildren(
            container,
            containerTitle,
            this.makeProjectsGroup(),
            projectCreatorButton,
        );
        return container;
    }

    static makeProjectsGroup() {
        const container = utils.etc('div','','projects');
        //this section to be removed
        utils.appChildren(
            container,
            utils.etc('div','sample','sample','select'),
            utils.etc('div','sample','sample','select')
        )
        //this section to be removed
        return container;
    }

    static makeMain() {
        const main = utils.cr('main');
        return main;
    }
}

dom.renderSkeleton();