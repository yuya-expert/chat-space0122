$(function(){
   // ここの中身だけを更新するようにできる
  function buildHTML(message){
    var imgHTML = message.image ? `<img src="${message.image}">`: ``;

    var html =
      `<div class = "chat-main__body--messages-list">
      <div class = "chat-main__message--clearfix">
        <div class = "chat-main__message--name">
          ${message.user_name}
        </div>
        <div class = "chat-main__message--time">
          ${message.created_at}
        </div>
        <div class = "chat-main__message--body">
          <p>${message.content}</p>
          <p>${imgHTML}</p>
        </div>
      </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = location.href
    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // うまくいった時はdoneが送信される
    .done(function(data){
      var html = buildHTML(data);
      $('input').prop('disabled', false);
      // 指定したクラスに対して、要素を追加していく
      $('.chat-main__body').append(html)
      $('.form__message').val('')
      $(message_image).val('')
      $(".chat-main__body").animate({scrollTop:100000});
    })
    // うまくいかなかった時はfailが送信される。
    .fail(function(){
      alert('error');
      $('input').prop('disabled', false);
    })
  })
});

