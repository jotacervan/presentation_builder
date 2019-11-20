class Presentation < ApplicationRecord
  belongs_to :user
  has_many :slides
  enum status: { pending: 1, finished: 0 }

  validates :name, presence: true
end
