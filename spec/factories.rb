FactoryBot.define do
  factory :user do
    name { "Test user" }
    email { "test@gmail.com" }
    password { "test4123" }
    password_confirmation { "test4123" }
    created_at { DateTime.parse('2019-11-15') }
    updated_at { DateTime.parse('2019-11-15') }
  end

  factory :presentation do
    name { "Presentation test" }
    description { "<p>Awesome presentation</p>" }
    status { 1 }
    created_at { DateTime.parse('2019-11-15') }
    updated_at { DateTime.parse('2019-11-15') }
    user
  end
end