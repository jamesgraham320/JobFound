class Note < ApplicationRecord
  belongs_to :contact, optional: true
  belongs_to :stage, optional: true
end
