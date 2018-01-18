class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :active_stage
  has_many :stages
  has_one :company

end
