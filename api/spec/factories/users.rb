FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "u#{i}@mail.ru" }
    sequence(:password) { "asdf1234" }
  end
end
