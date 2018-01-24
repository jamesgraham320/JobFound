class CreateStages < ActiveRecord::Migration[5.1]
  def change
    create_table :stages do |t|
      t.string :name, default: "Submitted"
      t.boolean :active, default: true
      t.datetime :start, default: DateTime.now
      t.datetime :end
      t.integer :application_stage
      t.integer :application_id

      t.timestamps
    end
  end
end
