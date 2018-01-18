class UsersController < ApplicationController
  #skip_before_action :authorized, only: [:index, :create, :show]

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.from_omniauth(request.env["omniauth.auth"])
    render json: user, token: issue_token({id: user.uid})
  end

  def show
    user = User.find(params[:id])
    render json: user
    #token = request.headers['Authorization']
    #id = JWT.decode(token, 'secret', false)[0]['id']
    #current_user = User.find(id)
    #if current_user
      #render json: UserSerializer.new(current_user)
    #else
      #render json: {error: 'Invalid token'}, status: 401
    #end
  end

end
