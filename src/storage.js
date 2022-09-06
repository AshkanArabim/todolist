import Project from './project';

export default class storage {
    static checkStorage() {
        console.log(localStorage)
        if (localStorage.length === 0) {
            this.populateStorage();
        } else {
            this.setOnlineData();
        }
    }

    static populateStorage() {
        localStorage.setItem(
            'allProjects',
            JSON.stringify(Project.allProjects)
        );
        console.log(`allprojects: ${Project.allProjects}`);
        console.log(`stringed: ${localStorage.getItem('allProjects')}`);
    }

    static setOnlineData() {
        const allProjectsString = localStorage.getItem('allProjects');
        if (allProjectsString === '') {allProjectsString = '[]'};
        Project.allProjects = JSON.parse(allProjectsString);

        Project.setMethods();

        console.log(`allprojects: ${Project.allProjects}`);
    }
}
