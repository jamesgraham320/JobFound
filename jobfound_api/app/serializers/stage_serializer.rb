class StageSerializer < ActiveModel::Serializer
  attributes :id, :name, :active, :start, :end, :application_id
  has_many :notes
end
