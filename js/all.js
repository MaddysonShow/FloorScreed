$(function() {
  var form_title;

  $( ".premises .uk-button" ).click(function() {
    form_title = $(this).closest('.wrapper').children('h3').text()
    $('#modal-call input[name=modalinfo]').val('Помещение:' + form_title);
  });

  $( ".results .uk-button" ).click(function() {
    form_title = $(this).closest('.info').find('h3').text()
    $('#modal-call input[name=modalinfo]').val(form_title);
  }); 
});