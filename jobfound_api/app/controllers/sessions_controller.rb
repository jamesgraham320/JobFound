class SessionsController < ApplicationController
  def create
    byebug
    user = User.from_omniauth(request.env["omniauth.auth"])
    #session[:user_id] = user.id
    redirect_to users_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to users_show
  end
end
