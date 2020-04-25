require 'grape-active_model_serializers'
require_relative 'v1/base'

module Api
  class Root < Grape::API
    format :json
    default_format :json
    formatter :json, Grape::Formatter::ActiveModelSerializers
    error_formatter :json, Grape::Formatter::ActiveModelSerializers

    rescue_from Grape::Exceptions::ValidationErrors do |e|
      error!(e, 422)
    end

    mount ::Api::V1::Base => '/api/v1'
    mount ::Api::V1::Base => '/v1'
  end
end
