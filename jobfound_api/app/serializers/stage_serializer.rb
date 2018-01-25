class StageSerializer < ActiveModel::Serializer
  attributes :id, :name, :active, :start, :end, :application_id, :created_at
  has_many :notes
end
