$(function() {
    updateCheckbox = function(checkbox) {
        if (checkbox.is(':checked')) {
            checkbox.parent().addClass("checked");
        } else {
            checkbox.parent().removeClass("checked");
        }
    }

    $("input[type='checkbox']").each(function() {
        updateCheckbox($(this));
    });

    $("body").on("change", "input[type='checkbox']", function() {
        updateCheckbox($(this));
    });

    $("body").on("click", ".sub-form", function() {
        if (!$(this).hasClass("display")) {
            $(this).closest(".container").find(".sub-form").removeClass("display");
            $(this).addClass("display");
        }
    });
});
