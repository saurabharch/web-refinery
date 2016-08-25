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
      var counter = $("iframe").contents().find(".changeThis").length;

      if(counter >= 1) {
        $("iframe").contents().find(".changeThis").css("border", "");
        $("iframe").contents().find(".ui-resizable").resizable().resizable("destroy")
        $("iframe").contents().find("*").removeClass("changeThis")
        $(event.target).addClass("changeThis").resizable();
      }

      $(event.target).addClass("changeThis").resizable();

      iframe.contents().mousedown(function(event)  {
        $(event.target).attr('draggable', 'true');
      });

      iframe.contents().mouseup(function(event)  {
        $(event.target).attr('draggable', 'false');
      });
    });
  });
  });

  $("#colorpicker").spectrum({
    flat:true,
    showInput:true,
    showAlpha:true,
    showPalette: true,
    palette: [],
    color: "#000",

    move:function(color) {
      $("iframe").contents().find(".changeThis").css(thingToChange, color.toRgbString());
      $("iframe").contents().find(".changeThis").val(color.toRgbString())
    }
  });
});

// jQuery.fn.selectText = function(){
//     var doc = $('#skeleton').get(0).contentWindow
//         , element = this[0]
//         , range, selection
//     ;
//     if (doc.body.createTextRange) {
//         range = doc.body.createTextRange();
//         range.moveToElementText(element);
//         range.select();
//     } else if (window.getSelection) {
//         selection = window.getSelection();
//         range = doc.createRange();
//         range.selectNodeContents(element);
//         selection.removeAllRanges();
//         selection.addRange(range);
//     }
// };

// function selectText(containerid) {
//  if (document.getElementById('skeleton').contentDocument.getSelection) {
//   var currentDoc = document.getElementById('skeleton').contentDocument;
//   var range = currentDoc.createRange();
//   range.selectNode(currentDoc.getElementsByClassName(containerid));
//   currentDoc.getSelection().addRange(range);
//         }
// }
