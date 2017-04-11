
function startCoinAnimation() {
    playCoinsSound();
    $(".coin").addClass("animated");
    playWinSound();
}

function stopCoinAnimation() {
    $(".coin").removeClass("animated");
}

function pullLeaver() {
    stopCoinAnimation();
    $(".leaver").addClass("pull");
    $(".nob").addClass("pull");
    playLeverSound();

    setTimeout(function() {
        $(".leaver").removeClass("pull");
        $(".nob").removeClass("pull");
    }, 1000);
}

function playWinSound() {
    document.getElementById("winSound").play();
}

function playCoinsSound() {
    document.getElementById("coinsSound").play();
}

function playLossSound() {
    document.getElementById("lossSound").play();
}

function playLeverSound() {
    document.getElementById("leverSound").play();
}

function playSpinSound() {
    document.getElementById("spinSound").play();
}

function playBonusSound() {
    document.getElementById("bonusSound").play();
}
