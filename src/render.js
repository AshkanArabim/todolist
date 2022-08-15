let render = (function() {
    function cr(element) {return document.createElement(element);}
    function qs(query) {return document.querySelector(query);}
    function appChildren(parent) {
        for (let i=1; i<=arguments.length-1; i++) {
            parent.appendChild(arguments[i]);
        }
    }

    const body = qs('body');
    const sidebar = cr('aside');
    const checklist = cr('main');

    appChildren(body, sidebar, checklist)
}) ()