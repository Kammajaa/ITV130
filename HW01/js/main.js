var toClose = null;

$(function() {

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }

    function validatePhone($phone) {
        var phoneReg = /^(\+?[0-9]{5,20})$/;
        return phoneReg.test( $phone );
    }

    updateCheckbox = function(checkbox) {
        if (checkbox.is(':checked')) {
            checkbox.parent().addClass("checked");
        } else {
            checkbox.parent().removeClass("checked");
        }
    };

    $("body").on("focus", ".datepicker", function() {
        $(this).datepicker({
            dateFormat: "d.mm.yy",
            onClose: function() {
                if($(this).hasClass("required-date") && $(this).val().trim() === "") {
                    $(this).parent().addClass("error");
                    $(this).parent().find(".error-message").show();
                } else {
                    $(this).parent().removeClass("error");
                    $(this).parent().find(".error-message").hide();
                }
            }});
    });

    $("input[type='checkbox']").each(function() {
        updateCheckbox($(this));
    });

    $("body").on("change", "input[type='checkbox']", function() {
        updateCheckbox($(this));
    }).on("click", ".sub-form h4", function() {
      // console.log($(this).parent());

        if (!$(this).parent().hasClass("display")) {
          $(this).closest('.container').find('.display').removeClass("display");
            // var i = $(this).parent().parent().find(".subForm");
            $(this).parent().addClass("display");
            // i.removeClass("display");
        } else {
            $(this).parent().removeClass("display");
        }
    }).on("focusout", ".required", function() {
        if ($(this).val().trim() === '') {
            $(this).val("");
            $(this).parent().addClass("error");
            $(this).parent().find(".error-message").text("Kohustuslik").show();
        } else {
            $(this).parent().removeClass("error");
          $(this).parent().find(".error-message").hide();
        }
    }).on("click", ".submitBtn", function() {
      console.log("SUBMIT");
      $(".required").each(function() {
        checkRequired($(this));
      });
      var body = $('body');
      body.animate({
        scrollTop: $('.error').offset().top - 125
      });
      var formSubmit = {

      }

    }).on("click", ".addBtn", function() {
      var item = $(this).closest('.container').find('.template').first().clone();
      console.log(item);
      item.removeClass('template');
      item.addClass('display');
      item.show();
      $(this).closest('.container').find('.display').removeClass("display");
      $(this).closest('.container').find('.subFormHolder').append(item);
    }).on("click", ".closeItem", function(e) {
      e.preventDefault();
      $('#closeDialog').show();
      toClose = $(this).closest('.subForm');
    }).on("click", ".dialog .ok", function(e) {
      e.preventDefault();
      if (toClose !== null) {
        toClose.remove();
      }
      toClose = null;
      $(this).parent().hide();
    }).on("input", ".title", function() {
      if ($(this).val().trim() === '') {
        $(this).closest(".subForm").find("h4").first().text($(this).closest('.container').find('.template').first().find('h4').first().text());
      } else {
        $(this).closest(".subForm").find("h4").first().text($(this).val());
      }
    }).on("input", ".title2", function() {
      var first = $(this).closest('.subForm').find('.firstName').first().val().trim();
      var last = $(this).closest('.subForm').find('.lastName').first().val().trim();
      if (first === '' && last === '') {
        $(this).closest(".subForm").find("h4").first().text($(this).closest('.container').find('.template').first().find('h4').first().text());
      } else if (first === '') {
        $(this).closest(".subForm").find("h4").first().text(last);
      } else if (last === '') {
        $(this).closest(".subForm").find("h4").first().text(first);
      } else {
        $(this).closest(".subForm").find("h4").first().text(last + ", " + first);
      }
    }).on("focusout", ".email", function() {
        if($(this).val().trim() !== "") {
            if(!validateEmail($(this).val().trim())) {
                $(this).parent().addClass("error");
                $(this).parent().find(".error-message").text("Vigane e-mail").show();
            } else  {
                $(this).parent().removeClass("error");
                $(this).parent().find(".error-message").hide();
            }
        }
    }).on("focusout", ".phone-nr", function() {
        if($(this).val().trim() !== "") {
            if(!validatePhone($(this).val().trim())) {
                $(this).parent().addClass("error");
                $(this).parent().find(".error-message").text("Vigane telefoni nr.").show();
            } else  {
                $(this).parent().removeClass("error");
                $(this).parent().find(".error-message").hide();
            }
        }
    });
});

function checkRequired(field) {
  if (field.val() === '') {
    field.parent().addClass("error");
    field.parent().find(".error-message").show();
  } else {
    field.parent().removeClass("error");
    field.parent().find(".error-message").hide();
  }
}
