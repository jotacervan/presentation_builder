class PresentationController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :set_presentation, only: [:show, :update, :destroy]

  def index
    @presentation = current_user.presentations.all
    render json: @presentation, status: :ok
  end

  def show
    render json: @presentation.to_json(include: [:slides]), status: :ok
  end

  def create
    @presentation = Presentation.create(presentation_params)
    render json: @presentation, status: :created
  end

  def update
    @presentation.update(presentation_params)
    render json: @presentation, status: :ok
  end

  def destroy
    @presentation.destroy
    render json: [], status: :ok
  end

  private
    def set_presentation
      @presentation = Presentation.find(params[:id])
    end

    def presentation_params
      params.require(:presentation).permit(:name, :description, :status, :user_id)
    end
end
