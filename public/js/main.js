$(document).ready(function() {

// Creating a truck
$('#createtruck').submit(function(e) {
  e.preventDefault()
  let data = $('#truckcreate').serialize();
  $.post('/create_truck', data).done(function(result) {
    console.log(result);
    });
  })
})