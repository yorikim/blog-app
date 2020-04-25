FactoryBot.define do
  factory :post do
    user

    sequence(:title) { |i| "Title #{i}" }
    body { Faker::Lorem.paragraph }
  end
end
