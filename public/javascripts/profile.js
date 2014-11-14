$(function() {
  $(document).ready(function() {
    var schoolId = $('.id').text();

    $('.addressData').css('display', 'none');

    $.ajax({
      url: '/profile/address/' + schoolId,
      method: 'POST'
    }).done(function(data) {
      $('.addressData').css('display', 'initial');
      $('#street1').append(data.address1);
      $('#street2').append(data.address2);
      $('#city').append(data.city);
      $('#state').append(data.state);
      $('#zip').append(data.postal_code);
    });
  });
});