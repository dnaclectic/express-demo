function postGifs(){
  event.preventDefault();
  var keyword = $('#keyword').val();
  var url = $('#url').val();
  var description = $('#description').val();
  var data = {
    gif: {
      keyword: keyword,
      url: url,
      description: description
    }
  };
  $.ajax({
    contentType: "application/json",
    processData: false,
    type: "POST",
    url: "/v1/gifs",
    dataType: "json",
    success: function(msg){
      console.log(msg);
    },
    error: function(msg){
      console.log("error", msg);
    },
    data: JSON.stringify(data)
  })
  console.log(keyword, url, description);
}



// var input = document.querySelector('.form-control');
//
// function postGifs(){
//   var keyword = input.value;
//   var url = $.val('#url');
//   var description = $.val('#description');
//   console.log(keyword, url, description);
// }
