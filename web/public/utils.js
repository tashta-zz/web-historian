//ajax request that gets all sites.txt data, and uses
//jquery appends to populate li.
var getSites = function() {
  $.ajax({
    url: "data/sites.txt",
    type: 'GET',
    contentType: 'text',
    dataType: 'text',
    success: function(data){
      console.log("I ran");
      $('nav ul').html('');      
      var urlsArray = data.split('\n');
      _.each(urlsArray, function(url){
        // $element = $('li').html('<li>'url);
        $('nav ul').append('<li><a href="sites/' + url + '">'+ url + '</a></li>');
      })
    }
  });
};

getSites();

$(document).ready(function(){
  $("form").on('submit', function(e){
  	e.preventDefault();
  	var newUrl = $('.urlBox').val();
    $('nav ul').append('<li>' + newUrl + '<span class="wait">Waiting</span></li>');
    setTimeout(getSites, 60000);
  	$.ajax({
      url: "/",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({url: newUrl}),
      dataType: 'json',
    });
  })
})