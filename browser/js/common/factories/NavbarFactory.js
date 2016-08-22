app.factory('NavbarFactory', function (){


    var Navbar = function (outerHTML) {
        this.classes = [];
        this.links = [];
        this.html = outerHTML;

    };

    Navbar.prototype.parseNavbar = function (){
        var classString = this.html.match(/<nav.+class="(.*?)"/)[1];
        var classArray = classString.split(' ');

        var links = this.html.match(/(<li.+>[\s\S]+?<\/li>)/g)
        links = links.map(match => match.replace(/\s{2,}/g, ''))
        
        this.links = links;
        this.classes = classArray;
    }

    Navbar.prototype.addClasses = function (classArray) {
        this.classes = classArray;
    };

    Navbar.prototype.createNavbar = function () { 
        var classes = ' " ' + this.classes.join(' ') + ' " ';
        var classCode = 'class = ' + classes;
        this.html = '<nav ' + classCode + '>';
    };

    Navbar.prototype.toggleClass = function (classString){
        var index = this.classes.indexOf(classString)
        console.log(classString)
        if (index > -1){ 
            $('#skeleton').contents().find('nav').removeClass(classString)
            this.classes.splice(index,1);
        }
        else {
            $('#skeleton').contents().find('nav').addClass(classString)
            this.classes.push(classString)
        }
    }

    Navbar.prototype.align = function(side){
        console.log(side);
        if (side === 'top') {
            $('#skeleton').contents().find('nav').removeClass('navbar-fixed-left navbar-fixed-right navbar-fixed-bottom');
            $('#skeleton').contents().find('nav').addClass('navbar-fixed-top');
        }

        else if (side === 'bottom') {
            $('#skeleton').contents().find('nav').removeClass('navbar-fixed-left navbar-fixed-right navbar-fixed-top')
            $('#skeleton').contents().find('nav').addClass('navbar-fixed-bottom');
        }
    }

    //  Navbar.protoype.toggleInverse = function() {
        
    //     if ($('#skeleton').contents().find('nav').hasClass('navbar-inverse')) 
    //         $('#skeleton').contents().find('nav').removeClass('navbar-inverse')
       
    //     else $('#skeleton').contents().find('nav').addClass('navbar-inverse')
    // }

    return {
        Navbar: Navbar
    };
});
