require 'faker'
require 'factory_bot'

require_relative '../../../spec/factories/users'
require_relative '../../../spec/factories/posts'

Post.delete_all
User.delete_all

user = FactoryBot.create(:user, email: "user@ex.com")

5.times { FactoryBot.create(:post) }
