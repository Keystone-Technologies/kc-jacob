var appTray;

var gridster1;
var gridster2;
var gridster3;
var gridster4;
var gridster5;
//var json = testAjax();
var newName;
var inputVal;
var startingName;
var $currentFolder;

    var tempJSON = [
        {"width":100, "height":100, "src":"temp/images-1.jpg", "class": "", "text":"Mom", "email":"ktravis@connexinsoftware.com "},
        {"width":100, "height":100, "src":"temp/images-1.jpg", "class": "", "text":"Dad", "email":"stravis@keystone-technologies.com"},
        {"width":100, "height":100, "src":"temp/images-2.jpg", "class": "", "text":"Andy", "email":"abelval@keystone-technologies.com"},
        {"width":100, "height":100, "src":"temp/images-3.jpg", "class": "", "text":"Stefan", "email":"sadams@keystone-technologies.com"},
        {"width":100, "height":100, "src":"temp/images-4.jpg", "class": "", "text":"Mason", "email":"mdrothert@gmail.com"},
        {"width":100, "height":100, "src":"temp/images-5.jpg", "class": "", "text":"Jason", "email":"thejasonslewis@gmail.com"},
        {"width":100, "height":100, "src":"temp/images-6.jpg", "class": "", "text":"Ben", "email":"bnolen@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/images-7.jpg", "class": "", "text":"Rob", "email":"rt@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/imgres-12.jpg", "class": "", "text":"Eric", "email":"ehumes@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/images-8.jpg", "class": "", "text":"Caleb", "email":"calbers@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/images-9.jpg", "class": "", "text":"Adam", "email":"asloggett@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/imgres-10.jpg", "class": "", "text":"Montez", "email":"mfitzpatrick@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/imgres-11.jpg", "class": "", "text":"Dave", "email":"dhaas@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/imgres-11.jpg", "class": "", "text":"Cody", "email":"ckniffen@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/imgres-11.jpg", "class": "", "text":"Josh", "email":"jgraham@keystone-it.com"},
        {"width":100, "height":100, "src":"temp/imgres-11.jpg", "class": "", "text":"Keith", "email":"kmayfield@keystone-it.com"}
    ];








function freewallAddCells(){
    var temp =
        "<div class='brick {class}' style='width:{width}px; height:{height}px;' name='{text}' email='{email}'><img src={src} /><h1>{text}</h1></div>";
//          var w = 1, h = 1, html = '', limitItem = 10;

    var w = 1, h = 1, html = '', limitItem = tempJSON.length;

    for (var i = 0; i < limitItem; ++i){
        html += temp
            .replace(/\{width\}/, tempJSON[i].width)
            .replace("{height}", tempJSON[i].height)
            .replace("{src}", tempJSON[i].src)
            .replace("{class}", tempJSON[i].class)
            .replace("{email}", tempJSON[i].email)
            .replace("{text}", tempJSON[i].text)
            .replace("{text}", tempJSON[i].text);
    }

    $("#freewall1").html(html);
    $(".folder").children("img").remove();
    // addMenuToIcons();
}

function addMenuToIcons() {
    var dropdownHtml = "<div class=\"dropdown icon-menu\"><a class=\"fa fa-bars dropdown-toggle\" type=\"button\" id=\"dropdownMenu2\" data-toggle=\"dropdown\" aria-expanded=\"true\"></a><ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu2\"></ul></div>";
    var deleteItem = "<li role=\"presentation\"><a class=\"delete-icon\" role=\"menuitem\" tabindex=\"-1\">Delete</a></li>";
    var addToItem = "<li class=\"dropdown add-dropdown\" role=\"presentation\"><a class=\"add-to-menu-item\">Add To</a><ul class=\"add-flyout\"></ul></li>";
    var addToDropdown = "";
    $(".brick").append(dropdownHtml);
    $(".icon-menu ul").append(deleteItem);
    $(".icon-menu ul").append(addToItem);
    populateAddTo();
    
}

function populateAddTo() {
    $(".add-flyout").empty();
    $("#freewall1 .folder").each(function(){
        var $this = $(this).clone().children().remove().end().text();
        $(".add-flyout").append("<li class=\"add-flyout-item list-unstyled\">" + $this + "</li>");
    });
    deleteItem();
} 


function deleteItem(){
    $('.delete-icon').click(function() {
        console.log("Icon Deleted");
        $(this).parentsUntil($(".free-wall")).remove();
        populateAddTo();
    });
    $('.add-flyout-item').click(function() {
        console.log("Icon added to folder");
        $(this).parentsUntil($(".free-wall")).remove();
        populateAddTo();
    });
};

function freewallInit() {

    var wall = new freewall("#freewall1");
    wall.reset({
        draggable: true,
        selector: '.brick',
        animate: true,
        fixSize:0,
        cellW: 100,
        cellH: 100,
//        rightToLeft: true,
        onResize: function() {
            wall.fitWidth();
//            wall.setHoles({
//             top:0,
//             left:0,
//             width:4,
//             height:5   
//            });
//            $(".folder").removeClass("brick");
        }
    });
    
    wall.fitWidth();
    console.log("grids loaded");
}

$(function () {
    freewallAddCells();
    freewallInit();
//    deleteItem();
//    requestPassword();
//    thumbnailDraggable($(".gs-w"));
//    trashDroppable();
//    createFolderDroppable();
//    showFolderModal();
//    bannerCloseEvent();
});



//Archived functions for later stages of development

//function wall2Droppable() {
//    $("#freewall2").droppable({
//        accept: "#freewall1 .brick",
//        hoverClass: "dropzone-hover",
//        activeClass: "dropzone-active",
//        tolerance: "pointer",
//        drop: function (event, ui) {
//            $(ui.draggable)
//                .attr("data-delay", "")
//                .attr("data-position", "")
//                .prependTo($("#freewall2"));
//            var wall1Clone = $("#freewall1").clone();
//            var wall2Clone = $("#freewall2").clone();
//            $("#freewall1").remove();
//            $("#freewall2").remove();
//            wall1Clone.appendTo($(".grid-container"));
//            wall2Clone.appendTo($(".grid-container"));
////                $("#freewall1").clone().appendTo($(".grid-container"));
////                $("#freewall2").clone().appendTo($(".grid-container"));
//            freewallInit();
//        }
//    });
//}

//function brickDraggable($thumb) {
//    $thumb.draggable({
//        containment: "#home",
//        scroll: false,
////        cursorAt: {
////            top: -15
////        },
//        stop: function () {
//            console.log("dragging stopped");
//            freewallInit();
////            $thumb.draggable("destroy");
//        },
//        drag: function (event, ui) {
//            console.log("dragging");
//        }
//    });
//}

//function testAjax() {
//    $.ajax({
//        type: 'POST',
//        dataType: 'jsonp',
//        url: 'http://keystone-connect.dev.kit.cm/api/grid/1',
//        success: function(data) {
//            json = data;
//            console.log(json[0].label);
//            loadSerial($("#grid-3 ul,#grid-4 ul,#grid-5 ul"));
//            return json;
//        },
//        error: function(data) {
//            console.log('error', data );
//        }
//    });
//}

//function appTrayDroppable($droppable,$accept) {
//    $droppable.droppable({
//        accept: $accept,
//
//        tolerance: "touch",
//        drop: function (event, ui) {
//            if($droppable.find("li").hasClass('thumb-empty')) {
//                var thumbCopy = $(ui.draggable).contents().clone();
//                $(ui.draggable).empty();
//                thumbCopy.appendTo($droppable.find("thumb-empty").first());
//                $droppable.find("thumb-empty").first()
//                    .removeClass("thumb-empty")
//                    .addClass("thumb-occupied");
//            }
//        }
//    });
//}


//function showFolderModal() {
//    $(".folder").click(function () {
////        newName;
////        inputVal;
//        $currentFolder = $(this);
//        startingName = $currentFolder.children("h2").text();
//        $(".folder-modal").modal('show');
//        $(".folder-name").html(startingName);
//        $(".folder-name").on("dblclick", function () {
//            $(this).addClass("hidden");
//            $(".folder-input")
////                .attr("value", startingName)
////                .attr("placeholder", startingName)
//                .val(startingName)
//                .removeClass("hidden")
//                .keyup(function (event) {
//                    if (event.keyCode == 13) {
//                        inputVal = $(".folder-input").val();
//                        $(".folder-input")
//                            .addClass("hidden")
//                            .val(null);
//                        $(".folder-name")
//                            .removeClass("hidden")
//                            .html(inputVal);
//                        console.log(inputVal);
//                        newName = inputVal;
//                        $currentFolder.children("h2").html(newName);
//                        resetVariables();
//                    }
//                });
//        });
//    });
//}

//function resetVariables(){
//    newName = null;
//    inputVal = null;
//    startingName = null;
//    $currentFolder = null;
//    showFolderModal();
//}

//function thumbnailDraggable($thumb) {
//    $thumb.draggable({
//        containment: "#home",
//        scroll: false,
//        cursorAt: {
//            top: -15
//        },
//        axis: "y",
//        stop: function () {
//            LockClickEvents($(this));
//            $("#app-tray").droppable("destroy");
//
//        },
//        drag: function (event, ui) {
//            appTrayDroppable();
//            grid1Droppable();
//            var margin = ui.offset.top;
//        }
//    });
//}

//function addLocks($object) {
//    $object.children(".save-icon").remove();
//    $object.prepend("<img class=\"save-icon\" src=\"img/unlock3.svg\" />");
//    $(".icon").parent().siblings(".save-icon")
//        .css({"visibility": "visible"});
//    $(".folder").siblings(".save-icon")
//        .css({"visibility": "visible"});
//    $(".icon").parent().siblings(".gs-resize-handle")
//        .css({"visibility": "visible"});
//    $(".folder").siblings(".gs-resize-handle")
//        .css({"visibility": "visible"});
//}
//
//function LockClickEvents($object) {
//    $object.children('.save-icon').on("click", function () {
//        if ($(this).hasClass("icon-locked")) {
//            $(this)
//                .attr("src", "img/unlock3.svg")
//                .removeClass("icon-locked")
//                .parent()
//                .addClass("gs-w")
//                .draggable("enable");
//        }
//        else {
//            $(this)
//                .attr("src", "img/lock24.svg")
//                .addClass("icon-locked");
//            $(this)
//                .parent()
//                .removeClass('gs-w')
//                .draggable("disable");
//        }
//    });
//}
//
//
//
//function appTrayDroppable() {
//    $("#app-tray").droppable({
//        accept: "#grid-1 li, #grid-2 li, #grid-3 li, #grid-4 li, #grid-5 li",
//
//        tolerance: "pointer",
//        drop: function (event, ui) {
//            if($("#app-tray li").hasClass('thumb-empty')) {
//                var thumbCopy = $(ui.draggable).contents().clone();
//                $(ui.draggable)
//                    .empty()
//                    .addClass("thumb-empty")
//                    .removeClass("thumb-occupied");
//                thumbCopy.appendTo($("#app-tray .thumb-empty").first());
//                $("#app-tray .thumb-empty").first()
//                    .removeClass("thumb-empty")
//                    .addClass("thumb-occupied");
//            }
//        }
//    });
//}
//
//function createFolderDroppable() {
//    console.log("drop function running");
//    $("#create-folder").droppable({
//        tolerance: "pointer",
//        hoverClass: "dropzone-hover",
//        activeClass: "dropzone-active",
//        drop: function (event, ui) {
//            $(ui.draggable).empty();
//            $(ui.draggable)
//                .append("<div class=\"folder\"><h2>folder</h2></div>")
////                .addClass("thumb-occupied")
//                .removeClass("thumb-empty");
//            $(ui.draggable)
//                .append("<span class=\"gs-resize-handle gs-resize-handle-both\"></span>");
//            showFolderModal();
//        }
//    });
//}