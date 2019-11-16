require 'rails_helper'

RSpec.describe PresentationController, type: :controller do
  describe "check http status when user is authenticated" do
    before(:each){
      @presentation = create(:presentation)
      @user = @presentation.user
      sign_in @user
    }

    describe "GET #index" do
      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
    end

    describe "GET #show" do
      it "returns http success" do
        get :show, params: { id: @presentation }
        expect(response).to have_http_status(:success)
      end
    end

    describe "GET #create" do
      context "with valid params" do
        it "returns http success" do
          post :create, params: { presentation: { name: 'Test 1', user_id: @user.id } }
          expect(response).to have_http_status(:created )
        end

        it "create a new presentation" do
          expect {
            post :create, params: { presentation: { name: 'Test 1', user_id: @user.id } }
          }.to change(Presentation,:count).by(1)
        end
      end

      context "with invalid params" do
        it "raise parameter mission" do
          expect {
            post :create
          }.to raise_error(ActionController::ParameterMissing)
        end
      end
    end

    describe "GET #update" do
      context "with valid params" do
        it "returns http success" do
          put :update, params: { id: @presentation, presentation: { name: 'Test 2' } }
          expect(response).to have_http_status(:success)
        end

        it "update a presentation name" do
          put :update, params: { id: @presentation, presentation: { name: 'New name' } }
          @presentation.reload
          expect(@presentation.name).to eq('New name')
        end

        it "update a presentation status" do
          put :update, params: { id: @presentation, presentation: { status: 'finished' } }
          @presentation.reload
          expect(@presentation.status).to eq('finished')
        end
      end

      context "with invalid params" do
        it "raise parameter mission" do
          expect {
            post :update, params: { id: @presentation }
          }.to raise_error(ActionController::ParameterMissing)
        end
      end

    end

    describe "GET #destroy" do
      it "returns http success" do
        delete :destroy, params: { id: @presentation }
        expect(response).to have_http_status(:success)
      end

      it "destroy a presentation" do
        expect {
          delete :destroy, params: { id: @presentation }
        }.to change(Presentation,:count).by(-1)
      end
    end
  end

  describe "check http status when user isn't authenticated" do
    before(:each){
      @presentation = create(:presentation)
    }

    describe "GET #index" do
      it "returns http redirect" do
        get :index
        expect(response).to have_http_status(:redirect)
      end
    end

    describe "GET #show" do
      it "returns http redirect" do
        get :show, params: { id: @presentation }
        expect(response).to have_http_status(:redirect)
      end
    end

  end
end
