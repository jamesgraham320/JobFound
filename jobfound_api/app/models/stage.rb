class Stage < ApplicationRecord
  belongs_to :application
  has_many :notes
end
