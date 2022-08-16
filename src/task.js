// const task = (function() {
//     function makeProject(title, desc, children = []) {
//         return {title, desc, children}
//     }
//     function makeItem(checked, title, desc, dueDate, dueTime, priority, notes) {
//         return {checked, title, desc, dueDate, dueTime, priority, notes};
//     }
//     return {makeItem, makeProject}
// }) ()

export default class task {
    getName() {
        console.log('name');
    }
}