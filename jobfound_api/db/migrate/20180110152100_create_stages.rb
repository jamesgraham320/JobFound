class CreateStages < ActiveRecord::Migration[5.1]
  def change
    create_table :stages do |t|
      t.string :name
      t.boolean :active
      t.datetime :start
      t.datetime :end
      t.integer :application_id

      t.timestamps
    end
  end
end
