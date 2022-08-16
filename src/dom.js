class utils {
    static cr(element) {return document.createElement(element);}
    static qs(query) {return document.querySelector(query);}
    static appChildren(parent) {
        for (let i=1; i<=arguments.length-1; i++) {
            parent.appendChild(arguments[i]);
        }
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
        const container = utils.cr('div');

        container.classList.add('header');
        container.textContent = 'To do list'

        return container;
    }

    static makeGeneralSection() {
        const container = utils.cr('div');
        const all = utils.cr('div');

        container.classList.add('general');
        all.textContent = 'All';

        utils.appChildren(container, all);

        return container;
    }

    static makeProjectsSection() {
        const container = utils.cr('div');
        const sampleProject = utils.cr('div');

        container.classList.add('projects')

        container.textContent = 'Projects';
        sampleProject.textContent = 'Sample';

        utils.appChildren(container, sampleProject);

        return container;
    }

    static makeMain() {
        const main = utils.cr('main');

        return main;
    }
}

dom.renderSkeleton();