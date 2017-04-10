var m1, m2, m3;

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


    $(".jou").click(function() {
        $("#winSound").play();
        $(".jou").hide()
    });

});


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