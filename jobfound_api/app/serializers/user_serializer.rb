class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :name, :family_name, :given_name, :email, :image_url, :phone
  has_many :applications
end
