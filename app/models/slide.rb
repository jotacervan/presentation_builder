class Slide < ApplicationRecord
  mount_uploader :image, ImageUploader
  mount_uploader :audio, AudioUploader
  belongs_to :presentation
  has_paper_trail

  validates :order, :image, presence: true
end
