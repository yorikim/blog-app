require 'dotenv/load'
require 'rack/test'
require 'database_cleaner'
require 'factory_bot'
require 'faker'

ENV['RACK_ENV'] ||= 'test'

# Report coverage to Code Climate
require 'simplecov'
SimpleCov.start do
  add_filter '/spec/'

  add_group 'API', 'app/api'
  add_group 'Models', 'app/models'
  add_group 'Interactors', 'app/interactors'
  add_group 'Tasks', 'lib/tasks'
end

require File.expand_path('../../application', __FILE__)

RSpec.configure do |config|
  config.include Rack::Test::Methods, type: :request
  config.include FactoryBot::Syntax::Methods

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.before(:suite) do
    FactoryBot.find_definitions
  end

  config.before(:suite) do
    DatabaseCleaner.allow_remote_database_url = true
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.warnings = true
  config.profile_examples = 10
  config.order = :random
  Kernel.srand config.seed
end
