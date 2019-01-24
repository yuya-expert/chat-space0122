class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json { @new_messages = @messages.where('id > ?', params[:id])}
       # json形式でアクセスがあった場合は、params[:message][:id]よりも大きいidがないかMessageから検索して、@new_messageに代入する

    end
  end

  #createと、メッセージの非同期通信を行う
  def create
    @message = @group.messages.new(message_params)
      if @message.save
        respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  def show
    @users = Group_users.all(params[:id])
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    @users = @group.users
  end
end
