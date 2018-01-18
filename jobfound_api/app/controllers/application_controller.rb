class ApplicationController < ActionController::Base
  #before_action :authorized
  #protect_from_forgery with: :exception


  def issue_token(payload)
    JWT.encode(payload, ENV['secret'], 'HS256')
  end

  def current_user
    user ||= User.find_by(uid: user_id)
  end

  def user_id
    decoded_token.first['uid']
  end

  def decoded_token
    begin
      JWT.decode(request.headers['Authorization'], ENV['secret'], true, { :algorithm => 'HS256' })
    rescue JWT::DecodeError
      [{}]
    end
  end

  def authorized
    render json: {message: "Not welcome" }, status: 401 unless logged_in?
  end

  def logged_in?
    !!current_user
  end
end
