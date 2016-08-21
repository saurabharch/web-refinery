app.factory('NavbarFactory', function (){

    var Navbar = function () {
        this.classes = [];
        this.links = [];
        this.htmlString = '';

    };

    Navbar.prototype.getClasses = function (outerHTML){
        var classString = outerHTML.match(/<nav.+class="(.*?)"/)[1];
        var classArray = classString.split(' ');
        this.classes = classArray;
    }

    Navbar.prototype.addClasses = function (classArray) {
        this.classes = classArray;
    };

    Navbar.prototype.createNavbar = function () { 
        var classes = ' " ' + this.classes.join(' ') + ' " ';
        var classCode = 'class = ' + classes;
        this.htmlString = '<nav ' + classCode + '>';
    };


    return {
        Navbar: Navbar
    };
});
