require 'rails'
require 'grape'
require 'grape-kaminari'
require 'active_record'
require 'kaminari/activerecord'
require 'rake'
require 'carrierwave'
require 'mime-types'

unless ENV['RACK_ENV'] == 'production'
  require 'pry-byebug'
end

# Load files from the models and api folders
app_dirs = %w[app initializers]

load_later = []
Dir[*app_dirs.map { |dir| "#{File.dirname(__FILE__)}/#{dir}/**/*.rb" }].each do |f|
  require f
rescue
  load_later << f
end
load_later.each { |f| require f }

# Mounting the Grape application
Application = Rack::Builder.new do
  map "/" do
    run Api::Root
  end
end
