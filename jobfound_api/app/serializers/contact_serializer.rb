class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone_num, :active, :company_id
  has_many :notes
end
