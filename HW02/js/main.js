$(function() {
    $(".jou").click(function() {
        $("#winSound").play();
        $(".jou").hide()
    })
})

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