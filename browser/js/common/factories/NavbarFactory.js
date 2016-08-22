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
        links = links.map(link => {
            return {
                html: link.replace(/\s{2,}/g, ''),
                name: link.replace(/\s{2,}/g, '').match(/<a.*?>([\S]+?)</)[1]
            }
        })
        
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
            $('#skeleton').contents().find('nav').removeClass('navbar-fixed-bottom navbar-fixed-side');
            $('#skeleton').contents().find('nav').addClass('navbar-fixed-top');
            $('#skeleton').contents().find('body').css('padding-top', '70px');
            $('#skeleton').contents().find('#navbarColumn').addClass('col-sm-3 col-lg-12 text-center');
            $('#skeleton').contents().find('#contentColumn').addClass('col-sm-9 col-lg-12 text-center');
        }

        else if (side === 'bottom') {
            $('#skeleton').contents().find('nav').removeClass('navbar-fixed-top navbar-fixed-side')
            $('#skeleton').contents().find('nav').addClass('navbar-fixed-bottom');
            $('#skeleton').contents().find('body').css('padding-top', '0px');
            $('#skeleton').contents().find('body').css('padding-bottom', '70px');
            $('#skeleton').contents().find('#contentColumn').removeClass();
            $('#skeleton').contents().find('#navbarColumn').addClass('col-sm-3 col-lg-12 text-center');
            $('#skeleton').contents().find('#contentColumn').addClass('col-sm-9 col-lg-12 text-center');
        }

        else if (side === 'left'){
            $('#skeleton').contents().find('nav').removeClass('navbar-fixed-bottom navbar-fixed-top')
            $('#skeleton').contents().find('nav').addClass('navbar-fixed-side');
            $('#skeleton').contents().find('body').css('padding-top', '0px')
            $('#skeleton').contents().find('#navbarColumn').removeClass();
            $('#skeleton').contents().find('#contentColumn').removeClass();
            $('#skeleton').contents().find('#navbarColumn').addClass('col-sm-3 col-lg-2');
            $('#skeleton').contents().find('#contentColumn').addClass('col-sm-9 col-lg-10');
        }

        else if (side === 'right'){
            $('#skeleton').contents().find('nav').removeClass('navbar-fixed-bottom navbar-fixed-top')
            $('#skeleton').contents().find('nav').addClass('navbar-fixed-side');
            $('#skeleton').contents().find('body').css('padding-top', '0px')
            $('#skeleton').contents().find('#navbarColumn').removeClass();
            $('#skeleton').contents().find('#contentColumn').removeClass();
            $('#skeleton').contents().find('#navbarColumn').addClass('col-sm-3 col-lg-2 col-sm-push-9 col-lg-push-10');
            $('#skeleton').contents().find('#contentColumn').addClass('col-sm-9 col-lg-10 col-sm-pull-3 col-lg-pull-2');
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
