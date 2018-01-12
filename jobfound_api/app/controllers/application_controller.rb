
class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def encode(payload)
    payload = {
      payload: payload,
      exp: 4.hours.from_now.to_i,
      iat: Time.now.to_i
    }
    JWT.encode payload, ENV['JWT_SECRET'], 'HS256'
  end

  def decode(token)
    options = {
      verify_iss: true,
      verify_iat: true,
      leeway: 30,
      algorithm: 'HS256'
    }
    JWT.decode token, ENV['JWT_SECRET'], true, options
  end
  
end
