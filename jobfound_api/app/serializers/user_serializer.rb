class UserSerializer < ActiveModel::Serializer
  attributes :uid, :name, :id
  has_many :applications
end
