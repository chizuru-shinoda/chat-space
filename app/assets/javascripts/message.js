// $(document).on('turbolinks:load', function(){
$(function()　{
  
  function buildHTML(message) {

    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">${content} </p>
                    <p class="lower-message__content">${img}</p>
                  </div>
                </div>`
  return html;
  }

//メッセージ送信の非同期化
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      scrollBottom();

      function scrollBottom(){
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({scrollTop: position}, 300, 'swing');
      }
    })

    .fail(function(data){
      alert('error');
    })

    .always(function(data){
      $('.form-submit').prop('disabled', false);
    })
  })

//自動更新

  function reloadMessages () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      if($('.messages')[0]){
          var message_id = $('.message:last').data('id');
      }else {
          var message_id = 0
      }

      $.ajax({ 
        url: 'api/messages', 
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })
      
      .done(function (messages) { 
        console.log(messages);
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })   

      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
