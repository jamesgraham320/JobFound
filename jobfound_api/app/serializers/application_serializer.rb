class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :user_id
  has_one :stage
  has_one :company

end
