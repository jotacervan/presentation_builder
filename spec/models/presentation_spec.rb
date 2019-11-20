require 'rails_helper'

RSpec.describe Presentation, type: :model do
  describe 'create new presentation' do
    before(:all) do
      @user = create(:user)
    end
    it 'cannot create presentation without user' do
      expect(Presentation.create(name: 'Presentation 1', description: '<h1>Presentation description</h1>').valid?).to be(false)
    end
    it 'cannot create presentation withou name' do
      expect(Presentation.create(description: '<h1>Presentation description</h1>').valid?).to be(false)
    end
    it 'initial status needs to be pending' do
      presentation = @user.presentations.create(name: 'Presentation 1', description: '<h1>Presentation description</h1>')
      expect(presentation.status).to eq("pending")
    end
    it 'it should allow creation of presentation without description' do
      presentation = @user.presentations.create(name: 'Presentation 1')
      expect(presentation.valid?).to be true
    end
    after(:all) do
      User.destroy_all
    end
  end
end
