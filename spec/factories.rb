FactoryBot.define do
  factory :slide do
    order { 1 }
    presentation { nil }
    image { fixture_file_upload(Rails.root.join('spec', 'files', '640x360.png'), 'image/png')}
  end

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