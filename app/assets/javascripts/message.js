$(function(){
   // ここの中身だけを更新するようにできる
  function buildHTML(message){
    var imgHTML = message.image ? `<img src="${message.image}">`: ``;

    var html =
      `<div class = "chat-main__body--messages-list" data-id = "${message.id}">
      <div class = "chat-main__message--clearfix">
        <div class = "chat-main__message--name">
          ${message.user_name}
        </div>
        <div class = "chat-main__message--time">
          ${message.created_at}
        </div>
        <div class = "chat-main__message--body">
          <div>${message.content}</div>
            ${imgHTML}
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

  // 自動通信の処理
  $(function(){
    setInterval(update, 5000);
    //10000ミリ秒ごとにupdateという関数を実行する
    function update(){ //この関数では以下のことを行う
        var message_id = $('.chat-main__body--messages-list:last').data('id'); //一番最後にある'chat-main__message--time'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      $.ajax({ //ajax通信で以下のことを行う
        url: location.href, //urlは現在のページを指定
        type: 'GET', //メソッドを指定
        data: { id: message_id }, //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
        dataType: 'json' //データはjson形式
      })
      // うまくいった時はdoneが送信される
      .done(function(data){
        if (data.length != 0){
        data.forEach(function(message) {
        var html = buildHTML(message);
        // 指定したクラスに対して、要素を追加していく
        $('.chat-main__body').append(html)
        $('.chat-main__body').animate({scrollTop:100000});
      });
      }
    })
      // うまくいかなかった時はfail_が送信される
          .fail(function(){
        alert('error');
        $('input').prop('disabled', false);
      })
    }
   }
  });
});
