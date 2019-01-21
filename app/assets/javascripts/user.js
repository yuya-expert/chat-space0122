$(document).on('turbolinks:load', function() {
  var search_list = $(".user-search-result");
  // 該当のユーザーの数だけappendUserメソッドを呼び出す
  function appendUser(user) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  };
  // 配列が空の場合は何も呼び出さない
  function appendNotMatch(message) {
    var html = "一致するユーザーはいません"
    search_list.append(html);
  };
  // htmlを作成する
  function buildHTML(id, name) {
    var html = `<div class="chat-group-user clearfix" id=chat-group-user-${id}>
                  <input type="hidden" name="group[user_ids][]" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}">削除</a>
                </div>`
    return html
  }
    // user-search-fieldに入力するたびに非同期で処理を行う
  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    // Ajax処理のフォーマット
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name : input },
      dataType: 'json'
    })
    // 成功時の処理
    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else {
        appendNotMatch(message)
      }
    })
    // 失敗時の処理
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    });
  });
  $(".user-search-result").on('click','.user-search-add', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    var insertHTML = buildHTML(id, name);
    $('.chat-group-users').append(insertHTML);
    $(this).parent('.chat-group-user').remove();
  });

  $(".chat-group-users").on('click', '.user-search-remove', function() {
    var id = $(this).data('user-id');
    $(`#chat-group-user-${id}`).remove();
  });
});
