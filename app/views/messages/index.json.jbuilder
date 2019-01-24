json.array! @new_messages do |message| # @new_messageを繰り返す
  json.user_name     message.user.name
  json.content       message.content
  json.image         message.image.url
  json.created_at    message.created_at.to_s(:defalut)
  json.id            message.id
end
