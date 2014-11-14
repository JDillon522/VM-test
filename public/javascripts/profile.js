$(function() {
  var schoolId = $('.id').attr('value');
  $(document).ready(function() {
    $('.addressData').css('display', 'none');
    $('.studentReviews').css('display', 'none');

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

  $.ajax({
    url: '/profile/student-reviews/' + schoolId,
    method: 'POST'
  }).success(function(data) {
    if (data.length) {
      $('.studentReviews').css('display', 'initial');
      var dom = '<div class="row">';
      
      $.each(data, function(index, element) {
        var name = element.student_name;
        var branch = element.branch.name + ' ' + element.mos;
        var exp = element.student_experience;

        dom +=  '<div class="thumbnail">' +
                  '<dl>' +
                    '<dt>Name:</dt>' +
                    '<dl class="review-student-name">' + name + '</dl>' +
                    '<dt>Branch and MOS</dt>' +
                    '<dl class="review-branch-mos">' + branch +'</dl>' +
                    '<dt>Experience</dt>' +
                    '<dl class="review-experience">' + exp + '</dl>' +
                  '</dl>' + 
                '</div>';
      });

      dom += '</div>';
      $('.studentReviews').append(dom);
    }
  });
});