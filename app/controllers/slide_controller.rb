class SlideController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :set_slide, only: [:show, :update, :destroy]
  before_action :set_presentation, only: [:index, :pdf_upload]

  def index
    render json: @presentation.slides, status: :ok
  end

  def pdf_upload
    @presentation.update(pdf: params[:pdf])
    byebug
    render json: [], status: :ok
  end

  def show
    render json: @slide, status: :ok
  end

  def create
    slide = Slide.create(slide_params)
    render json: Slide.where(presentation_id: slide.presentation_id).order(:order), status: :created
  end

  def update
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

    def set_presentation
      @presentation = Presentation.find(params[:id])
    end
end
