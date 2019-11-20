require 'rails_helper'

RSpec.describe SlideController, type: :controller do
  describe "check http status when user is authenticated" do
    before(:each) do
      @presentation = create(:presentation)
      @user = @presentation.user
      @slide = create(:slide, presentation: @presentation)
      @file = fixture_file_upload(Rails.root.join('spec', 'files', '640x360.png'), 'image/png')
      @file2 = fixture_file_upload(Rails.root.join('spec', 'files', '350x350.png'), 'image/png')
      @audio = fixture_file_upload(Rails.root.join('spec', 'files', 'audio.mp3'), 'audio/mpeg3')
      sign_in @user
    end

    describe "GET #index" do
      it "returns http success" do
        get :index, params: { id: @presentation.id }
        expect(response).to have_http_status(:success)
      end
    end

    describe "GET #show" do
      it "returns http success" do
        get :show, params: { id: @slide.id }
        expect(response).to have_http_status(:success)
      end
    end

    describe "GET #create" do
      it "returns http success" do
        post :create, params: { slide: {order: 1, presentation_id: @presentation.id, image: @file } }
        expect(response).to have_http_status(:created)
      end

      it "changes slide count +1" do
        expect {
          post :create, params: { slide: {order: 1, presentation_id: @presentation.id, image: @file } }
        }.to change(Slide,:count).by(+1)
      end

      it "should not create without an image" do
        expect {
          post :create, params: { slide: {order: 1, presentation_id: @presentation.id } }
        }.to change(Slide,:count).by(0)
      end
    end

    describe "GET #update" do
      it "returns http success" do
        put :update, params: { id: @slide.id, slide: {order: 1, image: @file2} }
        expect(response).to have_http_status(:success)
      end
      it "update file" do
        put :update, params: { id: @slide.id, slide: {order: 1, image: @file2} }
        @slide.reload
        expect(@slide.image.filename.to_s).to eq('350x350.png')
      end
      it "update audio" do
        put :update, params: { id: @slide.id, slide: {order: 1, image: @file2, audio: @audio} }
        @slide.reload
        expect(@slide.audio.filename.to_s).to eq('audio.mp3')
      end
    end

    describe "GET #destroy" do
      it "returns http success" do
        delete :destroy, params: { id: @slide.id }
        expect(response).to have_http_status(:success)
      end

      it "change count -1" do
        expect{
          delete :destroy, params: { id: @slide.id }
        }.to change(Slide,:count).by(-1)
      end
    end
  end
end
