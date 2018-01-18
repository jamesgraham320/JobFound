class Application < ApplicationRecord
  belongs_to :user
  has_many :assets
  has_many :stages
  has_one :company
  has_many :notes, through: :stages

  def active_stage
    Stage.where({application_id: self.id, active: true})[0]
  end

  def serialize_stages
    self.stages.map {|stage| StageSerializer.new(stage)}
  end

end
