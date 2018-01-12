require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module JobfoundApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

  def  get_authorization
    scopes = ['https://www.googleapis.com/auth/plus.me']

    authorization = Google::Auth.get_application_default(scopes)
    authorization.apply({client_id: ENV['client_key']})
  end
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
