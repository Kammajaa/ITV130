var socket = io();

$(function() {
    var username = "";
    var currentWord = "pogonophobia";
    var startTime = "";
    var endTime = "";

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
            $("#input-word").focus();
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

    function displayNewWord() {
        $("#game-word").html("");

        var counter = 1;

        for (var i = 0; i < currentWord.length; i++) {
            $("#game-word").append("<div class='letter-" + counter + " small'>" + currentWord[i] + "</div>");
            if(counter == 3) {
                counter = 1;
            } else {
                counter++;
            }
        }

        $("#game-word").find(".small").first().removeClass("small").addClass("invert");
    }

    displayNewWord();

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

        socket.emit('search', username);

        // setTimeout(function() {
        //     $("#search-overlay").hide();
        //     $("#countdown").show();
        //     startCountdown();
        // }, 1000);
    });

    $("#cancel").click(function() {
        $("#search-overlay").hide();
        $("#new-game").show();
        $("#gameMenuBackgroundSound").prop("muted", false);
        $("#searchOpponentSound").prop("muted", true);
    });

    socket.on('to-game', function(data) {
        console.log(data);

        $("#search-overlay").hide();
        $("#countdown").show();
        startCountdown();
    });

});
