$(function() {
    $("#input-username").focusin(function() {
        $(this).parent().addClass("active");
    });

    $("#input-username").focusout(function() {
        $(this).parent().removeClass("active");
    });
});
