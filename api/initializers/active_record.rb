require 'erb'

template = ERB.new(File.read('./db/config.yml'))
db_configuration = YAML.load(template.result)

ActiveRecord::Base.establish_connection(db_configuration[ENV['RACK_ENV'] || 'development'])
