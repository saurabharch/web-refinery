
$("body").on("click",function(event){
    var counter = $(".changeThis").length
    console.log(counter)
    if(counter>0){
        console.log("remove")
        $("*").removeClass("changeThis")
        $(event.target).addClass("changeThis")
    }
$(event.target).addClass("changeThis")
console.log($(event.target))

})

$(document).ready(function () {
    $("iframe").each(function () {
        //Using closures to capture each one
        var iframe = $(this);
        iframe.on("load", function () { //Make sure it is fully loaded
            iframe.contents().click(function (event) {
              var counter = $("iframe").contents().find(".changeThis").length
    console.log(counter)
    if(counter>=1){
        console.log("remove")
        $("iframe").contents().find("*").removeClass("changeThis")
        $(event.target).css("border-style", "none")
        $(event.target).addClass("changeThis")

    }
$(event.target).addClass("changeThis")
$(event.target).css("border-style", "solid")

console.log($(event.target))

            });
        });

    });
});


$(document).ready(function() {
   $("#colorpicker").spectrum({
    flat:true,
    showInput:false,
    color: "#000",
    move:function(color){
        console.log('moving')
        console.log(color.toRgbString())
    $("iframe").contents().find(".changeThis").css('color', color.toRgbString());
        $("iframe").contents().find(".changeThis").val(color.toRgbString())
    }
   });
});
