OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['client_key'], ENV['secret_key'], 
    {
      scope: 'userinfo.email, userinfo.profile, calendar'
    }
end
