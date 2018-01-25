class NoteSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :stage_id, :contact_id
end
