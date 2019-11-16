FactoryBot.define do
  factory :user do
    name { "Test user" }
    email { "test@gmail.com" }
    password { "test4123" }
    password_confirmation { "test4123" }
  end
end