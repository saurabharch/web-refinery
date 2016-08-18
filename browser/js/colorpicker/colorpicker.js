var thingToChange = "color"

var changeContent = function(){
    thingToChange = "color"
}

var changeBackground =function(){
    thingToChange="background-color"
}

var changeBorder = function(){
    thingToChange = "border-color"
}

$(document).ready(function () {
    $("iframe").on('load').each(function () {
        //Using closures to capture each one
        var iframe = $(this);
        iframe.on("load", function () { //Make sure it is fully loaded
            iframe.contents().click(function (event) {
            var counter = $("iframe").contents().find(".changeThis").length
            console.log("start", counter)
    if(counter>=1){
        $("iframe").contents().find(".changeThis").css("border", "");
         $("iframe").contents().find(".ui-resizable").resizable().resizable("destroy")
        $("iframe").contents().find("*").removeClass("changeThis")
        $(event.target).addClass("changeThis").resizable()
        console.log("kj;alksjdf;ljkasd;fk", counter)
    }
$(event.target).addClass("changeThis").resizable()
$("iframe").contents().find(".changeThis").css("border", "4px solid rgb(189, 195, 199)");

// console.log($(event.target))

            });
        });

    });
});


$(document).ready(function() {
   $("#colorpicker").spectrum({
    flat:true,
    showInput:true,
    showAlpha:true,
    showPalette: true,
    palette: [],
    color: "#000",
    move:function(color){
    $("iframe").contents().find(".changeThis").css(thingToChange, color.toRgbString());
        $("iframe").contents().find(".changeThis").val(color.toRgbString())
    }
   });
});
