require 'rails_helper'

RSpec.describe Slide, type: :model do
  describe 'create a new slide' do
    before(:each) do
      @presentation = create(:presentation)
      @user = @presentation.user
    end

    it 'without order should be invalid' do
      expect(@presentation.slides.create().valid?).to eq(false)
    end

    it 'without presentation should be invalid' do
      expect(Slide.create(order: 1).valid?).to eq(false)
    end

    it 'with image attached' do
      @slide = @presentation.slides.new(order:1)
      @slide.image.attach(io: File.open(Rails.root.join('spec', 'files', '640x360.png')), filename: '640x360.png', content_type: 'image/png')
      @slide.save!
      expect(@slide.image).to be_attached
      expect(@slide.image.filename.to_s).to eq('640x360.png')
    end

    it 'with audio attached' do
      @slide = @presentation.slides.new(order:1)
      @slide.image.attach(io: File.open(Rails.root.join('spec', 'files', '640x360.png')), filename: '640x630.png', content_type: 'image/png')
      @slide.audio.attach(io: File.open(Rails.root.join('spec', 'files', 'audio.mp3')), filename: 'audio.mp3', content_type: 'audio/mpeg3')
      @slide.save!
      expect(@slide.audio).to be_attached
      expect(@slide.audio.filename.to_s).to eq('audio.mp3')
    end

    it 'create slide successfully' do
      expect{
        @slide = @presentation.slides.new(order:1)
        @slide.image.attach(io: File.open(Rails.root.join('spec', 'files', '640x360.png')), filename: '640x630.png', content_type: 'image/png')
        @slide.save!
      }.to change(Slide,:count).by(+1)
    end
  end

  describe 'update a new slide' do
    before(:each) do
      @presentation = create(:presentation)
      @user = @presentation.user
      @slide = create(:slide, presentation: @presentation)
    end

    it 'check if filename is 640x360.png' do
      expect(@slide.image.filename.to_s).to eq('640x360.png')
    end

    it 'change file to 350x350.png' do
      @slide.image.purge_later
      @slide.image.attach(io: File.open(Rails.root.join('spec', 'files', '350x350.png')), filename: '350x350.png', content_type: 'image/png')
      expect(@slide.image).to be_attached
      expect(@slide.image.filename.to_s).to eq('350x350.png')
    end
  end

  describe 'delete a new slide' do
    before(:each) do
      @presentation = create(:presentation)
      @user = @presentation.user
      @slide = create(:slide, presentation: @presentation)
    end

    it 'should delete a slide' do
      expect {
        @slide.destroy
      }.to change(Slide,:count).by(-1)
    end
  end
end
