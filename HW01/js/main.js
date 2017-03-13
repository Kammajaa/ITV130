var toClose = null;

$(function () {

    var counties = {
        et: ["Harjumaa", "Läänemaa", "Ida-Virumaa", "Lääne-Virumaa"],
        fn: ["Lapland", "Kainuu", "Satakunta", "Satakunta"],
        lt: ["Kurzeme", "Zemgale", "Vidzeme", "Latgale"],
        lv: ["Šiauliai", "Kaunas", "Klaipėda", "Utena"]
    }

    function updateSubRegions(country) {
        $("#eventCounty").html("<option default>-- valige maakond --</option>");

        $.each(counties[country], function (key, value) {
            $("#eventCounty").append("<option>" + value + "</option>");
        });

    }

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    function validatePhone($phone) {
        var phoneReg = /^(\+?[0-9]{5,20})$/;
        return phoneReg.test($phone);
    }

    function updateCheckbox(checkbox) {
        if (checkbox.is(':checked')) {
            checkbox.parent().addClass("checked");
        } else {
            checkbox.parent().removeClass("checked");
        }
    }

    function displaySubFormErrorMinimized(element) {
        if (element.parents(".sub-form").has(".error").length > 0) {
            element.parents(".sub-form").addClass("contains-error");
        } else {
            element.parents(".sub-form").removeClass("contains-error");
        }
    }

    $("#eventCountry").on("change", function () {
        updateSubRegions($(this).val());
    });

    $("input[type='checkbox']").each(function () {
        updateCheckbox($(this));
    });

    $(".message").on("click", function () {
        if ($(this).parent().hasClass("open")) {
            $(this).parent().removeClass("open");
        } else {
            $(this).parent().addClass("open");
        }
    });

    $("body").on("focus", ".datepicker", function () {
        $(this).datepicker({
            dateFormat: "d.mm.yy",
            beforeShow: function (input, inst) {
                var topVal = $(this).offset().top - 10;
                var leftVal = "10%";

                if ($(window).width() > 600) {
                    leftVal = "calc(6% + " + ($(this).offset().left / 2) + "px)";
                }
                setTimeout(function () {
                    inst.dpDiv.css({
                        top: topVal + "px",
                        left: leftVal
                    });
                }, 0);
            },
            onClose: function () {
                if ($(this).hasClass("required-date") && $(this).val().trim() === "") {
                    $(this).parent().addClass("error");
                    $(this).parent().find(".error-message").show();
                    $(this).parent().find(".error-message").text("Kohustuslik").show();
                } else {
                    $(this).parent().removeClass("error");
                    $(this).parent().find(".error-message").hide();
                }
            }
        });
    }).on("change", "input[type='checkbox']", function () {
        updateCheckbox($(this));
    }).on("click", ".sub-form h4", function () {

        if (!$(this).parent().hasClass("display")) {
            $(this).closest('.container').find('.display').removeClass("display");
            // var i = $(this).parent().parent().find(".subForm");
            $(this).parent().addClass("display");
            // i.removeClass("display");
        } else {
            $(this).parent().removeClass("display");
        }
    }).on("focusout", ".required", function () {
        if ($(this).val().trim() === '') {
            $(this).parent().addClass("error");
            $(this).parent().find(".error-message").text("Kohustuslik").show();
        } else {
            $(this).parent().removeClass("error");
            $(this).parent().find(".error-message").hide();
        }
    }).on("input", ".required", function () {
        $(this).parent().removeClass("error");
        $(this).parent().find(".error-message").hide();
    }).on("click", ".addBtn", function () {
        var item = $(this).closest('.container').find('.template').first().clone();
        item.removeClass('template');
        item.addClass('display');
        item.show();
        $(this).closest('.container').find('.display').removeClass("display");
        $(this).closest('.container').find('.subFormHolder').append(item);
    }).on("click", ".closeItem", function (e) {
        e.preventDefault();
        $('#closeDialog').show();
        toClose = $(this).closest('.subForm');
    }).on("click", ".dialog .ok", function (e) {
        e.preventDefault();
        if (toClose !== null) {
            toClose.remove();
        }
        toClose = null;
        $(this).parent().hide();
    }).on("input", ".title", function () {
        if ($(this).val().trim() === '') {
            $(this).closest(".subForm").find("h4").first().text($(this).closest('.container').find('.template').first().find('h4').first().text());
        } else {
            $(this).closest(".subForm").find("h4").first().text($(this).val());
        }
    }).on("input", ".title2", function () {
        updateTitle($(this));
    }).on("input", ".identificationCode", function () {
        var serialNumber = $(this).val();
        var parent = $(this).closest('.subForm, .container');
        if (serialNumber.length === 11) {
            $.get("https://avaldus.tk/id/" + serialNumber, function (data) {
            }).done(function (data) {
                var firstName = parent.find('.lastName').first();
                var lastName = parent.find('.firstName').first();
                if (data.lastName !== null && lastName.val().trim() === '') {
                    lastName.val(data.lastName);
                    if (parent.hasClass('container')) {
                        lastName.parent().removeClass("error");
                        lastName.parent().find(".error-message").hide();
                    }
                }
                if (data.firstName !== null && firstName.val().trim() === '') {
                    firstName.val(data.firstName);
                    if (parent.hasClass('container')) {
                        firstName.parent().removeClass("error");
                        firstName.parent().find(".error-message").hide();
                    }
                }
                if (parent.hasClass('subForm')) {
                    updateTitle(firstName);
                }
            });
            var yearPref = 19;
            if (serialNumber.substr(0, 1) === '5' || serialNumber.substr(0, 1) === '6') yearPref++;
            var birthDate = parent.find('.birthDate').first();
            if (birthDate.val().trim() === '') {
                birthDate.val(serialNumber.substr(5, 2) + "." + serialNumber.substr(3, 2) + "." + yearPref + serialNumber.substr(1, 2));
            }

        }
    }).on("focusout", ".email", function () {
        if ($(this).val().trim() !== "") {
            if (!validateEmail($(this).val().trim())) {
                $(this).parent().addClass("error");
                //$(this).parents(".sub-form").addClass("container-error");
                $(this).parent().find(".error-message").text("Vigane e-mail").show();
            } else {
                $(this).parent().removeClass("error");
                $(this).parent().find(".error-message").hide();
            }
        } else {
            if (!$(this).hasClass("required")) {
                $(this).parent().removeClass("error");
                $(this).parent().find(".error-message").hide();
            }
        }

        displaySubFormErrorMinimized($(this));

    }).on("focusout", ".phone-nr", function () {
        if ($(this).val().trim() !== "") {
            if (!validatePhone($(this).val().trim())) {
                $(this).parent().addClass("error");
                $(this).parent().find(".error-message").text("Vigane telefoni nr.").show();
            } else {
                $(this).parent().removeClass("error");
                $(this).parent().find(".error-message").hide();
            }
        } else {
            if (!$(this).hasClass("required")) {
                $(this).parent().removeClass("error");
                $(this).parent().find(".error-message").hide();
            }
        }

        displaySubFormErrorMinimized($(this));

    }).on("click", ".submitBtn", function () {
        $(".required, .required-date").each(function () {
            checkRequired($(this));
        });
        var affirmation = $('#affirmation');
        if (!affirmation.find('.checkbox').first().hasClass('checked')) {
            affirmation.addClass('error');
            affirmation.find('.error-message').first().show();
        }
        var body = $('body');
        var formSubmit = {
            event: {
                date: $('#eventDate').val().trim(),
                time: $('#eventTime').val().trim(),
                country: $('#eventCountry').val(),
                county: $('#eventCounty').val(),
                place: $('#eventPlace').val().trim(),
                description: $('#eventDescription').val().trim(),
                proprietaryDamage: $('#proprietaryDamage').val().trim()
            },
            person: {
                identificationCode: $('#serialNumber').val().trim(),
                birthDate: $('#birthDate').val().trim(),
                lastName: $('#lastName').val().trim(),
                firstName: $('#firstName').val().trim(),
                nationality: $('#personNationality').val(),
                county: $('#personCounty').val(),
                address: $('#personAddress').val().trim(),
                postcode: $('#personPostcode').val().trim(),
                eMail: $('#personEpost').val().trim(),
                phone: $('#personPhone').val().trim(),
                additional: $('#personAdditional').val().trim(),
                isJuridical: $('#personIsJuridical').find('.checkbox').first().hasClass('checked')
            },
            possession: [],
            culprit: [],
            witness: [],
            additional: {
                agreementProcedure: $('#agreementProcedure').find('.checkbox').first().hasClass('checked'),
                documentsToEmail: $('#documentsToEmail').find('.checkbox').first().hasClass('checked'),
                informationByEtoimik: $('#informationByEtoimik').find('.checkbox').first().hasClass('checked')
            }
        };

        $('#possession').children().each(function () {
            if ($(this).hasClass('template')) return;
            var possession = {
                name: $(this).find('.possessionName').first().val().trim(),
                acquisitionYear: $(this).find('.acquisitionYear').first().val().trim(),
                currentValue: $(this).find('.currentValue').first().val().trim(),
                inLockedRoom: $(this).find('.inLockedRoom').first().find('.checkbox').first().hasClass('checked'),
                hadDate: $(this).find('.possessionDate').first().val().trim(),
                hadTime: $(this).find('.possessionTime').first().val().trim(),
                leaveDate: $(this).find('.possessionLeaveDate').first().val().trim(),
                leaveTime: $(this).find('.possessionLeaveTime').first().val().trim(),
                additional: $(this).find('.possessionAdditionalInfo').first().val().trim()
            };
            formSubmit.possession.push(possession);
        });
        $('#culprit').children().each(function () {
            if ($(this).hasClass('template')) return;
            var culprit = {
                lastName: $(this).find('.lastName').first().val().trim(),
                firstName: $(this).find('.firstName').first().val().trim(),
                identificationCode: $(this).find('.identificationCode').first().val().trim(),
                birthDate: $(this).find('.birthDate').first().val().trim(),
                nationality: $(this).find('.nationality').first().val(),
                country: $(this).find('.country').first().val(),
                address: $(this).find('.address').first().val().trim(),
                eMail: $(this).find('.eMail').first().val().trim(),
                phone: $(this).find('.phone').first().val().trim()
            };
            formSubmit.culprit.push(culprit);
        });
        $('#witness').children().each(function () {
            if ($(this).hasClass('template')) return;
            var witness = {
                lastName: $(this).find('.lastName').first().val().trim(),
                firstName: $(this).find('.firstName').first().val().trim(),
                identificationCode: $(this).find('.identificationCode').first().val().trim(),
                birthDate: $(this).find('.birthDate').first().val().trim(),
                nationality: $(this).find('.nationality').first().val(),
                country: $(this).find('.country').first().val(),
                address: $(this).find('.address').first().val().trim(),
                eMail: $(this).find('.eMail').first().val().trim(),
                phone: $(this).find('.phone').first().val().trim()
            };
            formSubmit.culprit.push(witness);
        });
        var error = $('.error, .contains-error');

        if (error.length === 0) {
            body.empty();
            body.html('<pre>' + JSON.stringify(formSubmit, null, 2) + '</pre>');
        } else {
            body.animate({
                scrollTop: error.offset().top - 125
            });
            $('html').animate({
                scrollTop: error.offset().top - 125
            });
        }

    }).on("change", "#affirmation input[type='checkbox']", function () {
        var affirmation = $('#affirmation');
        affirmation.removeClass('error');
        affirmation.find('.error-message').first().hide();

    }).on("focusout", ".validateDate", function () {
        var dateStr = $(this).val().trim();
        var testdate;
        try {
            testdate = $.datepicker.parseDate('dd.mm.yy', dateStr);
        } catch (e) {
            $(this).parent().addClass('error');
            $(this).parent().find('.error-message').show();
            $(this).parent().find(".error-message").text("Vigane kuupäev").show();
        }
        displaySubFormErrorMinimized($(this));
    }).on("focusin", ".validateDate", function() {

    });
});

function checkRequired(field) {
    if (field.val() === '') {
        field.parent().addClass("error");
        field.parent().find(".error-message").text("Kohustuslik").show();
    }
}

function updateTitle(title) {
    var first = title.closest('.subForm').find('.firstName').first().val().trim();
    var last = title.closest('.subForm').find('.lastName').first().val().trim();
    if (first === '' && last === '') {
        title.closest(".subForm").find("h4").first().text(title.closest('.container').find('.template').first().find('h4').first().text());
    } else if (first === '') {
        title.closest(".subForm").find("h4").first().text(last);
    } else if (last === '') {
        title.closest(".subForm").find("h4").first().text(first);
    } else {
        title.closest(".subForm").find("h4").first().text(last + ", " + first);
    }
}
