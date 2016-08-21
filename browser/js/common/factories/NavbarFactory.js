app.factory('NavbarFactory', function (){

    var Navbar = function () {
        this.classes = [];
        this.links = [];
        this.htmlString = '';
    }

    Navbar.prototype.addClasses = function (classArray) {
        this.classes = classArray;
    },

    Navbar.prototype.createNavbar = function () { 
        var classes = ' " ' + this.classes.join(' ') + ' " ';
        var classCode = 'class = ' + classes;

        this.htmlString = '<nav ' + classCode + '>'
    }


    return {
        Navbar: Navbar
    }
}











return navbarFactory;
})