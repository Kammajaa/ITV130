$(function() {
    updateCheckbox = function(checkbox) {
        if (checkbox.is(':checked')) {
            checkbox.parent().addClass("checked");
        } else {
            checkbox.parent().removeClass("checked");
        }
    };

    $("input[type='checkbox']").each(function() {
        updateCheckbox($(this));
    });

    $("body").on("change", "input[type='checkbox']", function() {
        updateCheckbox($(this));
    }).on("click", ".sub-form h4", function() {
        if (!$(this).parent().hasClass("display")) {
            $(this).parent().closest(".container").find(".sub-form").removeClass("display");
            $(this).parent().addClass("display");
        } else {
            $(this).parent().removeClass("display");
        }
    }).on("focusout", ".required", function() {
        if ($(this).val() === '') {
            $(this).parent().addClass("error");
            $(this).parent().find(".error-message").show();
        } else {
            $(this).parent().removeClass("error");
          $(this).parent().find(".error-message").hide();
        }
    });
});
