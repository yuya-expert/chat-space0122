$(function(){
   // ここの中身だけを更新するようにできる
  function buildHTML(message){

    if(message.image != null){
      var img = `<img src="${message.image}">`
    }else{
      var img = ``
    }

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
          ${message.content}
        ${img};
        </div>
      </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    // console.log(this)
    var formData = new FormData(this);
    var href = window.location.href
    // console.log(href)
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
       console.log(data)
      var html = buildHTML(data);
      $('input').prop('disabled', false);
      // 指定したクラスに対して、要素を追加していく
      $('.chat-main__body').append(html)
      $('.form__message').val('')
      $(".chat-main__body").animate({scrollTop:100000});
    })
    // うまくいかなかった時はfailが送信される。
    .fail(function(){
      alert('error');
      $('input').prop('disabled', false);
    })
  })
});
