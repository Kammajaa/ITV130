var esemeid = 1;

$('#add-stolen-item-btn').click(function () {
  var vara = $('#vara').clone();
  vara.attr("id", "vara_" + esemeid);
  vara.html(vara.html().replace(/Rvara_idR/g, esemeid++));
  vara.show();
  $('#test').append(vara);
});

function testhide(id) {
  var item = $("#vara_content_" + id);
  if (item.is(":visible")) {
    item.slideUp();
  } else {
    item.slideDown();
  }
}

function clost(id) {
  console.log("#vara_" + id);
  var item_id = '#vara_' + id;
  console.log(item_id);
  $(item_id).remove();
}