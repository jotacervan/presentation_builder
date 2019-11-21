class Presentation < ApplicationRecord
  mount_uploader :pdf, PdfUploader
  belongs_to :user
  has_many :slides
  enum status: { pending: 1, finished: 0 }
  has_paper_trail

  validates :name, presence: true
end
