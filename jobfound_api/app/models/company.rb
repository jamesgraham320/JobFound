class Company < ApplicationRecord
  belongs_to :application
  has_many :contacts
  has_many :notes, through: :contacts
end
