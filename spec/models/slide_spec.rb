require 'rails_helper'

RSpec.describe Slide, type: :model do
  describe 'create a new slide' do
    before(:each) do
      @presentation = create(:presentation)
      @user = @presentation.user
      @file = fixture_file_upload(Rails.root.join('spec', 'files', '640x360.png'), 'image/png')
      @file2 = fixture_file_upload(Rails.root.join('spec', 'files', '350x350.png'), 'image/png')
      @audio = fixture_file_upload(Rails.root.join('spec', 'files', 'audio.mp3'), 'audio/mpeg3')
    end

    it 'without order should be invalid' do
      expect(@presentation.slides.create().valid?).to eq(false)
    end

    it 'without presentation should be invalid' do
      expect(Slide.create(order: 1).valid?).to eq(false)
    end

    it 'with image attached' do
      @slide = @presentation.slides.new(order:1, image: @file)
      @slide.save!
      expect(@slide.image.file.filename).to eq('640x360.png')
    end

    it 'with audio attached' do
      @slide = @presentation.slides.new(order:1, image: @file, audio: @audio)
      @slide.save!
      expect(@slide.audio.file.filename).to eq('audio.mp3')
    end

    it 'create slide successfully' do
      expect{
        @slide = @presentation.slides.new(order:1, image: @file)
        @slide.save!
      }.to change(Slide,:count).by(+1)
    end
  end

  describe 'update a new slide' do
    before(:each) do
      @presentation = create(:presentation)
      @user = @presentation.user
      @file2 = fixture_file_upload(Rails.root.join('spec', 'files', '350x350.png'), 'image/png')
      @slide = create(:slide, presentation: @presentation)
    end

    it 'check if filename is 640x360.png' do
      expect(@slide.image.file.filename).to eq('640x360.png')
    end

    it 'change file to 350x350.png' do
      @slide.update(image: @file2)
      expect(@slide.image.file.filename).to eq('350x350.png')
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
