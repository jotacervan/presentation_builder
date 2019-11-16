class Presentation < ApplicationRecord
  belongs_to :user
  enum status: { pending: 1, finished: 0 }

  validates :name, presence: true
end
