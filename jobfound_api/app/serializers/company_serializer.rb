class CompanySerializer < ActiveModel::Serializer
  attributes :id, :application_id, :name, :address, :source
  has_many :contacts
end
