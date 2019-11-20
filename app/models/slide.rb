class Slide < ApplicationRecord
  belongs_to :presentation
  has_one_attached :image
  has_one_attached :audio

  validates :order, :image, presence: true
  validates :image, attached: true
end
