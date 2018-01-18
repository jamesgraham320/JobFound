class AssetSerializer < ActiveModel::Serializer
  attributes :id, :type, :file, :note, :user_id, :application_id
end
