class Application < ApplicationRecord
  belongs_to :user
  has_many :assets
  has_one :stage
  has_one :company
  has_many :notes, through: :stages

end
