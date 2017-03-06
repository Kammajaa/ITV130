$('#serialNumber').focusout(function () {
  var serialNumber = $(this).val();
  if (serialNumber.length === 11) {
    $.get("http://kristjan.tk:8081/" + serialNumber, function (data) {

    }).done(function (data) {
      $('#lastName').val(data.firstName);
      $('#firstName').val(data.lastName);
    });
    var yearPref = 19;
    if (serialNumber.substr(0, 1) === '5' ||serialNumber.substr(0, 1) === '6') yearPref ++;
    $('#birthDate').val(serialNumber.substr(5, 2) + "." + serialNumber.substr(3, 2) + "." + yearPref + serialNumber.substr(1, 2));

  }
});