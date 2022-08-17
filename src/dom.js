class utils {
    static cr(element) {return document.createElement(element);}
    static qs(query) {return document.querySelector(query);}
    static appChildren(parent) {
        for (let i=1; i<=arguments.length-1; i++) {
            parent.appendChild(arguments[i]);
        }
    }
    static etc(element, text, clas) {
        const product = this.cr(element);
        product.textContent = text;
        product.classList.add(clas);
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
            utils.etc('div','Inbox','inbox-select'),
            utils.etc('div','Today','today-select'),
            utils.etc('div','Next 7 Days','7days-select')
        );
        return container;
    }

    static makeProjectsSection() {
        const container = utils.etc('div','Projects','projects');
        utils.appChildren(
            container, 
            this.makeProject(),
            this.makeProject()
        );
        return container;
    }

    static makeProject() {
        const project = utils.etc('div','sample','project');
        return project;
    }

    static makeMain() {
        const main = utils.cr('main');
        return main;
    }
}

dom.renderSkeleton();