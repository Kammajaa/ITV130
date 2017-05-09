$(function() {
    var sessionId = -1;
    var username = "";
    var currentWord = "pogonophobia";
    var startTime = "";
    var endTime = "";
    var socket = io("http://typonaut.tk");

    socket.on('onconnected', function(data) {
        sessionId = data.id;
        console.log(sessionId);
    });

    socket.on("start-word", function(data) {
        alert(data.word);
    });

    function startCountdown() {
        setTimeout(function() {
            $("#timer").find(".invert").removeClass("invert");
            $("#timer").find(".small").addClass("invert");
        }, 1000);
        setTimeout(function() {
            $("#timer").find(".invert").removeClass("invert");
            $("#timer").find(".tiny").addClass("invert");
        }, 2000);
        setTimeout(function() {
            $("#timer").find(".invert").removeClass("invert");
            $("#timer").find(".go").addClass("invert");
        }, 3000);
        setTimeout(function() {
            $("#countdown").hide();
            $("#game").show();
        }, 3500);
    }

    function checkWord(word) {
        if (word.toUpperCase() === currentWord.toUpperCase()) {
            alert("win");
        } else {
            $("#game").find(".input-wraper").addClass("error");
            setTimeout(function() {
                $("#game").find(".input-wraper").removeClass("error");
            }, 500);
        }
    }

    $("#input-word").keypress(function (e) {
        if (e.which == 13)  {
            checkWord($(this).val());
        }
    });

    $("#submit").click(function() {
        checkWord($("#input-word").val());
    });

    $("#input-word").focusin(function() {
        $(this).parent().addClass("active");
    });

    $("#input-word").focusout(function() {
        if ($(this).val().trim().length == 0) {
            $(this).parent().removeClass("active");
        }
    });

    $("#input-username").focusin(function() {
        $(this).parent().addClass("active");
    });

    $("#input-username").focusout(function() {
        if ($(this).val().trim().length == 0) {
            $(this).parent().removeClass("active");
        }
    });

    $(".score-btn").click(function() {
        if ($("#highscore").is(':visible')) {
            $("#highscore").hide();
            $("#new-game").show();
        } else {
            $("#new-game").hide();
            $("#highscore").show();
        }
    });

    $("#start").click(function() {
        socket.emit('search', username);
        return;

        if ($("#input-username").val().trim() == "") {
            if (!$("#start").parent().find(".input-wraper").hasClass("error")) {
                $(this).parent().find(".input-wraper").addClass("error").find("span").text("Username mandatory!");
                setTimeout(function() {
                    $("#start").parent().find(".input-wraper").removeClass("error");
                }, 500);
            }

            return;
        }

        username = $("#input-username").val();

        $("#username").text("Username");
        $("#new-game").hide();
        $("#search-overlay").show();

        $("#gameMenuBackgroundSound").prop("muted", true);
        $("#searchOpponentSound").prop("muted", false);

        setTimeout(function() {
            $("#search-overlay").hide();
            $("#countdown").show();
            startCountdown();
        }, 1000);
    });

    $("#cancel").click(function() {
        $("#search-overlay").hide();
        $("#new-game").show();
        $("#gameMenuBackgroundSound").prop("muted", false);
        $("#searchOpponentSound").prop("muted", true);
    });
});
