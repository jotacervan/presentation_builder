require 'rails_helper'

RSpec.describe User, type: :model do
  context 'create user' do
    it 'cannot create a user without email' do
      user = User.create(name: 'Test user')
      expect(user.valid?).to be(false)
    end

    it 'cannot create a user without name' do
      user = User.create(email: 'test@email.com.br')
      expect(user.valid?).to be(false)
    end

    it 'cannot create a user without password' do
      user = User.create(name: 'User test', email: 'test@gmail.com.br')
      expect(user.valid?).to be(false)
    end

    it 'user created successfully' do
      user = User.create(name: 'User test', email: 'test@gmail.com.br', password: 'test1234', password_confirmation: 'test1234')
      expect(user.valid?).to be(true)
    end
  end
end
