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
            $("#gameSound").prop("muted", false);
            socket.emit('started');
            $("#timer").find(".invert").removeClass("invert");
            $("#timer").find(".first_3").addClass("invert");
            $("#input-word").focus();
        }, 3500);
    }

    function startGame() {
        if ($("#input-username").val().trim() == "") {
            if (!$("#start").parent().find(".input-wraper").hasClass("error")) {
                $("#start").parent().find(".input-wraper").addClass("error").find("span").text("Username mandatory!");
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
    }

    function checkWord(word) {
        if (word.toUpperCase() === currentWord.toUpperCase()) {
            socket.emit('word-change', word);
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

    $("#input-username").keypress(function (e) {
        if (e.which == 13)  {
            startGame();
        }
    });

    $("#start").click(function() {
        startGame();
    });

    $("#cancel").click(function() {
        $("#search-overlay").hide();
        $("#new-game").show();
        $("#gameMenuBackgroundSound").prop("muted", false);
        $("#searchOpponentSound").prop("muted", true);
        socket.emit('cancel-search');
    });

    socket.on('to-game', function(data) {
        console.log(data);
        currentWord = data.word;
        displayNewWord();
        $("#search-overlay").hide();
        $("#countdown").show();
        document.getElementById("countdownSound").play();
        $("#searchOpponentSound").prop("muted", true);
        startCountdown();
    });

    socket.on('win', function(data) {
        $("#input-word").val("");
        console.log(data);
        $("#gameSound").prop("muted", true);
        $("#game").hide();
        $('#loss_message').hide();
        $('#win_message').show();
        $('#name-1').text(data.youName);
        $('#name-2').text(data.opponentName);
        $('#time-1').text(data.time + 'ms');
        $('#time-2').text('Still typing...');
        $('#wins-1').text(data.youWins);
        $('#wins-2').text(data.opponentWins);
        $('#losses-1').text(data.youLosses);
        $('#losses-2').text(data.opponentLosses);
        $("#result").show();
        if (data.win) {document.getElementById("winSound").play();}
    });

    socket.on('both-end', function(data) {
        $("#input-word").val("");
        console.log(data);
        $("#game").hide();
        if (data.win) {
            $('#loss_message').hide();
            $('#win_message').show();
            $('#name-1').text(data.youName);
            $('#name-2').text(data.opponentName);
            $('#time-1').text(data.youTime + 'ms');
            $('#time-2').text(data.opponentTime + 'ms');
            $('#wins-1').text(data.youWins);
            $('#wins-2').text(data.opponentWins);
            $('#losses-1').text(data.youLosses);
            $('#losses-2').text(data.opponentLosses);
        } else {
            $('#win_message').hide();
            $('#loss_message').show();
            $("#gameSound").prop("muted", true);
            $('#name-1').text(data.opponentName);
            $('#name-2').text(data.youName);
            $('#time-1').text(data.opponentTime + 'ms');
            $('#time-2').text(data.youTime + 'ms');
            $('#wins-1').text(data.opponentWins);
            $('#wins-2').text(data.youWins);
            $('#losses-1').text(data.opponentLosses);
            $('#losses-2').text(data.youLosses);
            document.getElementById("lossSound").play();
        }
        $("#result").show();

    });

    // $("#input-word").on("input", function() {
    //     socket.emit('word-change', $(this).val());
    // });

    $('#again-btn').click(function() {
        $("#input-word").val("");
        $("#result").hide();
        $("#search-overlay").show();

        $("#gameMenuBackgroundSound").prop("muted", true);
        $("#searchOpponentSound").prop("muted", false);

        socket.emit('search', username);
    })

});
