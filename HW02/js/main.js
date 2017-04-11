var m1, m2, m3;

function startCoinAnimation() {
    $(".coin").addClass("animated");
}

function stopCoinAnimation() {
    $(".coin").removeClass("animated");
}

function pullLeaver() {
    $(".leaver").addClass("pull");
    $(".nob").addClass("pull");
    setTimeout(function() {
        $(".leaver").removeClass("pull");
        $(".nob").removeClass("pull");
    }, 1000);
}

$(function() {

    m1 = $('#slot1').slotMachine({
        active: 4,
        delay: 1000
    });

    m2 = $('#slot2').slotMachine({
        active: 4,
        delay: 1000
    });

    m3 = $('#slot3').slotMachine({
        active: 4,
        delay: 1000
    });



    $('body').on('click', '.nob', function() {
        m1.shuffle(1);
        m2.shuffle(1);
        m3.shuffle(1);
    });

});

function playWinSound() {
    document.getElementById("winSound").play();
    playCoinsSound();
    startCoinAnimation();
}

function playCoinsSound() {
    document.getElementById("coinsSound").play();
}

function playLossSound() {
    document.getElementById("lossSound").play();
}

function playLeverSound() {
    stopCoinAnimation();
    document.getElementById("leverSound").play();
    pullLeaver();
}

function playSpinSound() {
    document.getElementById("spinSound").play();
}

function playBonusSound() {
    document.getElementById("bonusSound").play();
}
