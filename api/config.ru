require 'dotenv/load'
require File.expand_path('../application', __FILE__)
require 'active_support'

if ENV['RACK_ENV'] == 'production'
  use Datadog::Contrib::Rack::TraceMiddleware
  use Raven::Rack
end

run Application
