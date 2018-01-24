require 'google/apis/gmail_v1'
require 'google/api_client/client_secrets'

class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :show]

  def index
    users = User.all
    render json: users
  end

  def create
    if params["user"]["id"]
      user = User.find(params["user"]["id"])
    else
      client_secrets= Google::APIClient::ClientSecrets.load(ENV["G_SECRETS"])
      auth_client = client_secrets.to_authorization
      auth_client.update!(
        :scope=>"profile calendar https://mail.google.com/",
        :redirect_uri => 'postmessage',
        :access_type => "offline",         # offline access
        :include_granted_scopes => "true"  # incremental auth
      )
      auth_client.code = auth_profile["code"]
      result = auth_client.fetch_access_token!
      # service = Gmail::GmailService.new
      # service.authorization = auth_client
      user = User.create_with(auth_profile).find_or_create_by(uid: auth_profile["uid"])
      result.keys.each {|key| key !="user_id" ? user[key]=(result[key]): nil}
      user.save
    end

    render json: {user: UserSerializer.new(user), token: issue_token({id: user.id})}
    #user = User.from_omniauth(request.env["omniauth.auth"])
  end

  def show
    token = request.headers['Authorization']
    id = JWT.decode(token, 'secret', false)[0]['id']
    user = User.find(id)
    if user
      render json: UserSerializer.new(user)
    else
      render json: {error: 'Invalid token'}, status: 401
    end
  end

  private

  def auth_profile
    params.require(:user).permit(:uid,:email,:name,:family_name,:given_name,:image_url,:code)
  end

end
