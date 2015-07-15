var appTray;
var newName;
var inputVal;
var startingName;
var $currentFolder;
var iconwidth = 100;
var iconheight = 100;
var gridheight;
var gridwidth;
var scrolltime = 500;
var horizontalgridScroll;
var verticalgridscroll;
//var json = testAjax();

$(window).resize(function(){
    $("#grid-container").height((Math.floor(($(window).height() - 200) / 100)) * 100);
    $("#grid-container").width(Math.floor(($(window).width() / 100)) * 100);
    verticalgridscroll = $("#grid-container").height();
    if ($("#grid-container").width > 1800){
        horizontalgridScroll = 0;
    }
    else {
        horizontalgridScroll = $("#grid-container").width();
    }
});

function requestPassword() {
    $("#password-modal").modal({
        backdrop: 'static',
        keyboard: false
    })
        .modal('show');

    $("#login-button").click(function () {

        if ($(".password-input").val() === "test" && $(".username-input").val() === "test") {
            console.log("modal closed");
            $("#password-modal").modal("hide");
        }
    });
}

function showFolderModal() {
    $(".folder").click(function () {
        $currentFolder = $(this);
        $(".folder-modal").modal('show');
        startingName = $currentFolder.clone().children().remove().end().text();
        $(".folder-name").html(startingName);
        $(".folder-name").on("dblclick", function () {
            startingName = $currentFolder.clone().children().remove().end().text();
            $(this).addClass("hidden");
            $(".folder-input")
                .val("")
                .val(startingName)
                .removeClass("hidden")
                .keyup(function (event) {
                    if (event.keyCode == 13) {
                        inputVal = $(".folder-input").val();
                        $(".folder-input")
                            .addClass("hidden");
                        $(".folder-name")
                            .removeClass("hidden")
                            .empty()
                            .append(inputVal);
                        console.log(inputVal);
                        newName = inputVal;

                        $currentFolder.contents().filter(function () {
                            return (this.nodeType == 3);
                        }).remove();
                        $currentFolder.append(newName);
                        // resetVariables();
                    }
                });
        });
    });
}

function freewallAddCells() {
    console.log("Adding cells to main grid");
    //var temp = "<div class='brick {class}' data-position=\"{initialPosition}\" link=\"{link}\" style='width:{width}px; height:{height}px;' oncontextmenu=\"javascript:iconRightClick($(this));return false;\">{text}<img src={src} /></div>";
    var temp = "<div class='brick {class}' data-position=\"{initialPosition}\" link=\"{link}\" style='width:{width}px; height:{height}px;'>{text}<img src={src} /></div>";
    
    var w = 1, h = 1, html = '', limitItem = tempJSON.length;

    for (var i = 0; i < limitItem; ++i) {
        html += temp
            .replace(/\{width\}/, tempJSON[i].width)
            .replace("{height}", tempJSON[i].height)
            .replace("{src}", tempJSON[i].src)
            .replace("{link}", tempJSON[i].link)
            .replace("{class}", tempJSON[i].class)
            .replace("{initialPosition}", tempJSON[i].initialPosition)
            .replace("{text}", tempJSON[i].text);
    }

    $("#freewall1").html(html);
    // freewallInit();
    $(".folder").children("img").remove();
    $(".rss").children("img").remove();
}

function appTrayAddCells() {
    console.log("Adding cells to app tray");
    var temp = "<div class='brick {class}' style='width:{width}px; height:{height}px;'>{text}<img src={src} /></div>";

    var w = 1, h = 1, html = '', limitItem = appTrayJSON.length;

    for (var i = 0; i < limitItem; ++i) {
        html += temp
            .replace(/\{width\}/, appTrayJSON[i].width)
            .replace("{height}", appTrayJSON[i].height)
            .replace("{src}", appTrayJSON[i].src)
            .replace("{class}", appTrayJSON[i].class)
            .replace("{text}", appTrayJSON[i].text);
    }

    $("#app-drawer").html(html);
    $(".folder, .rss").children("img").remove();
}

function firstWallAddCells() {
    console.log("Adding cells to app tray");
    //var temp = "<div class='brick {class}' link=\"{link}\" data-position=\"{initialPosition}\" style='width:{width}px; height:{height}px;' oncontextmenu=\"javascript:iconRightClick($(this));return false;\">{text}<img src={src} /></div>";
    var temp = "<div class='brick {class}' link=\"{link}\" data-position=\"{initialPosition}\" style='width:{width}px; height:{height}px;' >{text}<img src={src} /></div>";
    
    var w = 1, h = 1, html = '', limitItem = firstWallJSON.length;
    var columns = [];
    var rows = [];
    var widths = [];
    var heights = [];
    
    for (var i = 0; i < limitItem; ++i) {
        html += temp
            .replace(/\{width\}/, firstWallJSON[i].width)
            .replace("{height}", firstWallJSON[i].height)
            .replace("{src}", firstWallJSON[i].src)
            .replace("{class}", firstWallJSON[i].class)
            .replace("{link}", firstWallJSON[i].link)
            .replace("{initialPosition}", firstWallJSON[i].initialPosition)
            .replace("{text}", firstWallJSON[i].text);
            columns.push(Number(firstWallJSON[i].initialPosition.split('-')[0]));
            heights.push(Number(firstWallJSON[i].height));
            rows.push(Number(firstWallJSON[i].initialPosition.split('-')[1]));
            widths.push(Number(firstWallJSON[i].width));
            
    }
    var colmax = 0;
    var colmaxindex = 0;
    for (var i = 0; i < columns.length; i++) {
        if (columns[i] > colmax) {
            colmaxindex = i;
            colmax = columns[i];
        }
    }
    var rowmax = 0;
    var rowmaxindex = 0;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i] > rowmax) {
            rowmaxindex = i;
            rowmax = rows[i];
        }
    }
    gridheight = ((colmax + 1) * iconheight);
    if (heights[colmaxindex] != iconheight){
        gridheight += (heights[colmaxindex] - iconheight);
    }
    
    gridwidth = ((rowmax + 1) * iconwidth);
    if (rows[rowmaxindex] != iconwidth) {
        gridwidth += (widths[rowmaxindex] - iconwidth);
    }
    //gridheight = ((Math.max.apply(null, columns) + 1) * 100);
    //gridwidth = ((Math.max.apply(null, rows) + 1) * 100);
    $("#firstwall").css("height", gridheight);
    if (gridwidth > 1820){
        $("#firstwall").css("width", gridwidth);
    }
    $("#firstwall").html(html);
}


function appStoreAddCells() {
    console.log("Adding cells to app store grid");
    var temp = "<div class='brick {class}' link=\"{link}\" data-position=\"{initialPosition}\" style='width:{width}px; height:{height}px;' oncontextmenu=\"javascript:iconRightClick($(this));return false;\">{text}<img src={src} /></div>";

    var w = 1, h = 1, html = '', limitItem = appStoreJSON.length;

    for (var i = 0; i < limitItem; ++i) {
        html += temp
            .replace(/\{width\}/, 100)
            .replace("{height}", 100)
            .replace("{src}", appStoreJSON[i].src)
            .replace("{link}", appStoreJSON[i].link)
            .replace("{class}", appStoreJSON[i].class)
            .replace("{initialPosition}", appStoreJSON[i].initialPosition)
            .replace("{text}", appStoreJSON[i].text);
    }

    $("#apps-container").html(html);
    // freewallInit();
    $("#apps-container .folder").remove();
    $("#apps-container .rss").remove();
}


function addMenuToIcons() {
    console.log("Adding menu to icons");
    var dropdownHtml = "<div class=\"dropdown icon-menu\"><a class=\"fa fa-bars dropdown-toggle\" type=\"button\" id=\"dropdownMenu2\" data-toggle=\"dropdown\" aria-expanded=\"true\"></a><ul class=\"dropdown-menu list-unstyled\" role=\"menu\" aria-labelledby=\"dropdownMenu2\"></ul></div>";
    var dropupHtml = "<div class=\"dropup icon-menu\"><a class=\"fa fa-bars dropdown-toggle\" type=\"button\" id=\"dropdownMenu2\" data-toggle=\"dropdown\" aria-expanded=\"true\"></a><ul class=\"dropdown-menu list-unstyled\" role=\"menu\" aria-labelledby=\"dropdownMenu2\"></ul></div>";
    var deleteItem = "<li role=\"presentation\"><a class=\"delete-icon\" role=\"menuitem\" tabindex=\"-1\">Delete</a></li>";
    var renameItem = "<li role=\"presentation\"><a class=\"rename-folder-menu-item\" role=\"menuitem\" tabindex=\"-1\">Rename Folder</a></li>";
    var makeLargerItem = "<li role=\"presentation\"><a class=\"make-larger-menu-item\" role=\"menuitem\" tabindex=\"-1\">Make icon large</a></li>";
    // var makeWiderItem = "<li role=\"presentation\"><a class=\"make-wider-menu-item\" role=\"menuitem\" tabindex=\"-1\">Make icon wider</a></li>";
    var makeSmallerItem = "<li role=\"presentation\"><a class=\"make-smaller-menu-item\" role=\"menuitem\" tabindex=\"-1\">Make icon small</a></li>";
    // var makeShorterItem = "<li role=\"presentation\"><a class=\"make-shorter-menu-item\" role=\"menuitem\" tabindex=\"-1\">Make icon shorter</a></li>";
    var addToItemDropdown = "<li class=\" add-dropdown\" role=\"presentation\"><a class=\"add-to-menu-item\">Add To</a><ul class=\"add-flyout list-unstyled\"></ul></li>";
    $("#freewall1 .brick").append(dropdownHtml);
    $("#app-tray .brick").append(dropupHtml);

    $(".brick").each(function () {
        if ($(this).attr("data-height") == 100) {
            // $(this).find("ul").append(makeWiderItem);
            $(this).find("ul").append(makeLargerItem);
        }
        // if ($(this).attr("data-height") == 100 && $(this).attr("data-width") == 200) {
        //     $(this).find("ul").append(makeLargerItem);
        //     $(this).find("ul").append(makeSmallerItem);
        // }
        if ($(this).attr("data-height") == 200) {
            $(this).find("ul").append(makeSmallerItem);
            // $(this).find("ul").append(makeShorterItem);
        }
    });

    $(".folder .icon-menu ul").append(renameItem);
    $(".icon-menu ul").append(addToItemDropdown);
    $(".icon-menu ul").append(deleteItem);
    populateAddTo();
}

function populateAddTo() {
    console.log("populating \"add to\" sub-menu");
    $(".add-flyout").empty();
    $("#app-drawer .add-flyout").prepend("<li class=\"add-to-main-grid\">Main Grid</li>");
    $("#freewall1 .folder").each(function () {
        var $this = $(this).clone().children().remove().end().text();
        $(".add-flyout").append("<li class=\"add-flyout-item\">" + $this + "</li>");
    });
    $("#freewall1 .add-flyout").prepend("<li class=\"add-to-app-tray\">App Tray</li>");
    // iconMenuListeners();
}

function iconMenuListeners() {
    $('.brick-icon[link]').click(function() {
        window.location.href = $(this).attr("link");
        console.log($(this).attr("link"));
    });

    $('.delete-icon').click(function () {
        console.log("Icon Deleted");
        $(this).parentsUntil($(".free-wall")).remove();
        populateAddTo();
    });

    $('.make-larger-menu-item').click(function () {
        $(this)
            .parents(':eq(3)')
            .attr("data-height", "200")
            .attr("data-width", "200");
        $(".icon-menu")
            .remove();
        addMenuToIcons();
        iconMenuListeners();
        freewallInit();
    });

    $('.make-wider-menu-item').click(function () {
        $(this)
            .parents(':eq(3)')
            .attr("data-height", "100")
            .attr("data-width", "200");
        addMenuToIcons();
        iconMenuListeners();
        freewallInit();
    });
    $('.make-smaller-menu-item').click(function () {
        $(this)
            .parents(':eq(3)')
            .attr("data-height", "100")
            .attr("data-width", "100");
        $(".icon-menu")
            .remove();
        addMenuToIcons();
        iconMenuListeners();
        freewallInit();
    });
    $('.make-shorter-menu-item').click(function () {
        $(this)
            .parents(':eq(3)')
            .attr("data-height", "100")
            .attr("data-width", "200");
        $(".icon-menu")
            .remove();
        addMenuToIcons();
        iconMenuListeners();
        freewallInit();
    });

    $('.rename-folder-menu-item').click(function () {
        var folderName = $(this).parents(':eq(3)').clone().children().remove().end().text();
        $(".folder-rename-input").remove();
        $(this).parents(':eq(3)').append("<input class=\"folder-rename-input\" value=\"" + folderName + "\"></input>")
            .contents().filter(function () {
                return (this.nodeType == 3);
            }).remove();
        $(".folder-rename-input").keyup(function (event) {
            if (event.keyCode == 13) {
                $(this).parent().append($(this).val());
                $(this).remove();
            }
        });
        populateAddTo();
    });

    $('.add-to-app-tray').click(function () {
        $(this)
            .parents(':eq(4)')
            .removeAttr("data-delay")
            .removeAttr("data-position")
            .attr("data-height", "85")
            .attr("data-width", "85")
            .appendTo($("#app-drawer"));

        $("#app-tray .icon-menu")
            .removeClass("dropdown")
            .addClass("dropup");

        $("#app-tray .add-dropdown")
            .removeClass("dropdown")
            .addClass("dropup");
        populateAddTo();
        appTrayInit();
    });

    $('.add-to-main-grid').click(function () {
        $(this)
            .parents(':eq(4)')
            .appendTo($("#freewall1"));

        populateAddTo();
        freewallInit();
    });

    $('.add-flyout-item').click(function () {
        console.log("Icon added to folder");
        $(this).parentsUntil($(".free-wall")).remove();
        populateAddTo();
    });
    freewallInit();
    appTrayInit();
    console.log("menu listeners added");
};

function appStoreInit() {
    var appStore = new freewall("#apps-container");
    appStore.reset({
        // draggable: true,
        selector: '.brick',
        animate: true,
        fixSize: 0,
        cellW: 100,
        cellH: 100,
        onResize: function () {
            appStore.fitWidth();
        }
    });
    appStore.fitWidth();
    console.log("App Store Grid loaded");
}

function firstWallInit() {
    var wall = new freewall("#firstwall");
    wall.reset({
        draggable: false, /*true,*/
        selector: '.brick',
        animate: true,
        fixSize: 0,
        cellW: iconwidth,
        cellH: iconheight,
        //        rightToLeft: true,
        onResize: function () {
            wall.refresh();
            //horizontalgridScroll = $('#firstwall').width() - $("#grid-container").width();
            //verticalgridscroll = $("#grid-container").height();
            //            wall.setHoles({
            //             top:0,
            //             left:0,
            //             width:4,
            //             height:5   
            //            });
            //            $(".folder").removeClass("brick");
        }
    });
    wall.fitZone();
    console.log("main grid loaded");
}

function freewallInit() {
    var wall = new freewall("#freewall1");
    wall.reset({
        draggable: true,
        selector: '.brick',
        animate: true,
        fixSize: 0,
        cellW: 100,
        cellH: 100,
        //        rightToLeft: true,
        onResize: function () {
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
    wall.fitHeight();
    wall.fitWidth();
    console.log("main grid loaded");
}

function appTrayInit() {
    var appTray = new freewall("#app-drawer");
    appTray.reset({
        draggable: true,
        selector: '.brick',
        animate: true,
        fixSize: 0,
        cellW: 100,
        cellH: 100,
        onResize: function () {
            appTray.fitZone();
        }
    });

    appTray.fitWidth();
    console.log("app tray loaded");
}

function staticEventListeners() {

    var $gridContainer = $('.grid-container');
    var gridScroll = $('#firstwall').outerWidth(true) - $gridContainer.width();

    $("#left-full").click(function () {
        $gridContainer.animate({ scrollLeft: '+=-' + horizontalgridScroll }, scrolltime, 'easeOutQuad');
    });
    $("#up-full").click(function () {
        $gridContainer.animate({ scrollTop: '+=-' + verticalgridscroll }, scrolltime, 'easeOutQuad');
    });
    $("#down-full").click(function () {
        $gridContainer.animate({ scrollTop: '+=' + verticalgridscroll }, scrolltime, 'easeOutQuad');
    });
    $("#right-full").click(function () {
        $gridContainer.animate({ scrollLeft: '+=' + horizontalgridScroll}, scrolltime, 'easeOutQuad');
    });
    $(".close-banner").click(function () {
        $(".banner").hide();
    });
    $(".app-store-icon").dblclick(function () {
        $("#app-store-modal").modal("show");
        setTimeout(function(){ appStoreInit(); }, 200);
    });
    $("#apps-container .brick").click(function() {
        var appCopy = $(this)
            .attr("data-position", "")
            .clone();
        $("#freewall1").append(appCopy);
        freewallInit();
        // addMenuToIcons();
    });
    console.log("static listeners added");

}

function iconRightClick($button) {
    $button.find(".dropdown-toggle").dropdown("toggle");//.dropdown("toggle");
}

function swipeHandlers(){
    var $gridContainer = $('#grid-container');
    $("#grid-container").on('swipeleft', function(){
        $gridContainer.animate({ scrollLeft: '+=' + horizontalgridScroll}, scrolltime, 'easeOutQuad');
       console.log("Swiped left");
    });
    $("#grid-container").on('swiperight', function(){
        $gridContainer.animate({ scrollLeft: '+=-' + horizontalgridScroll}, scrolltime, 'easeOutQuad');
        console.log("Swiped right");
    });
    $("#grid-container").on('swipeup', function(){
        $gridContainer.animate({ scrollTop: '+=' + verticalgridscroll}, scrolltime, 'easeOutQuad');
        console.log("Swiped up");
    });
    $("#grid-container").on('swipedown', function(){
        $gridContainer.animate({ scrollTop: '+=-' + verticalgridscroll }, scrolltime, 'easeOutQuad');
        console.log("Swiped down");
    });
}

$(document).ready(function () {
    $("#grid-container").height((Math.floor(($(window).height() - 200) / 100)) * 100);
    $("#grid-container").width(Math.floor(($(window).width() / 100)) * 100);
    verticalgridscroll = $("#grid-container").height();
    if ($("#grid-container").width() > 1800){
        horizontalgridScroll = 0;
    }
    else {
        horizontalgridScroll = $("#grid-container").width();
    }
    // requestPassword();
    firstWallAddCells();
    freewallAddCells();
    appStoreAddCells();
    appTrayAddCells();
    firstWallInit();
    freewallInit();
    appTrayInit();
    addMenuToIcons();
    iconMenuListeners();
    console.log(horizontalgridScroll + ', ' + verticalgridscroll)
    staticEventListeners();
    showFolderModal();
    swipeHandlers();
});


//Archived functions for later stages of development

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