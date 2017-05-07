$(function() {
    var username = "";

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
            $("#highscore").hide();
            $("#new-game").show();
        } else {
            $("#new-game").hide();
            $("#highscore").show();
        }
    });

    $("#start").click(function() {
        if ($("#input-username").val().trim() == "") {
            if (!$("#start").parent().find(".input-wraper").hasClass("error")) {
                $(this).parent().find(".input-wraper").addClass("error").find("span").text("Username mandatory!");
                setTimeout(function() {
                    $("#start").parent().find(".input-wraper").removeClass("error");
                }, 500);
            }

            return;
        }


        $("#username").text("Username");
        $("#new-game").hide();
        $("#search-overlay").show();
    });

    $("#cancel").click(function() {
        $("#search-overlay").hide();
        $("#new-game").show();
    });
});
