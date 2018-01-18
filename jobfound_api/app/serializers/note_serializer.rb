class NoteSerializer < ActiveModel::Serializer
  attributes :id, :content, :stage_id, :contact_id
end
