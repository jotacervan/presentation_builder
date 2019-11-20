class SlideController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :set_slide, only: [:show, :update, :destroy]

  def index
    presentation = Presentation.find(params[:id])
    render json: presentation, status: :ok
  end

  def show
    render json: @slide, status: :ok
  end

  def create
    slide = Slide.create(slide_params)
    render json: slide, status: :created
  end

  def update
    @slide.image.purge_later if slide_params[:image].present?
    @slide.audio.purge_later if slide_params[:audio].present?
    @slide.update(slide_params)

    render json: @slide, status: :ok
  end

  def destroy
    @slide.destroy

    render json: [], status: :ok
  end

  private
    def slide_params
      params.require(:slide).permit(:image, :audio, :order, :presentation_id)
    end

    def set_slide
      @slide = Slide.find(params[:id])
    end
end
