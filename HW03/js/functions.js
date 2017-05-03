$(function() {
    $("#input-username").focusin(function() {
        $(this).parent().addClass("active");
    });

    $("#input-username").focusout(function() {
        if ($(this).val().trim().length == 0) {
            $(this).parent().removeClass("active");
        }
    });

    $("#score").click(function() {
        if ($("#highscore").is(':visible')) {
            $("#highscore").fadeOut();
            $("#new-game").fadeIn();            
        } else {
            $("#new-game").fadeOut();
            $("#highscore").fadeIn();
        }
    });

    $("#start").click(function() {
        $("#search-overlay").fadeIn();
    });

    $("#cancel").click(function() {
        $("#search-overlay").fadeOut();
    });
});
