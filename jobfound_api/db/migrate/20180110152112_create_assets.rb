class CreateAssets < ActiveRecord::Migration[5.1]
  def change
    create_table :assets do |t|
      t.string :type
      t.string :file
      t.string :note
      t.integer :user_id
      t.integer :application_id

      t.timestamps
    end
  end
end
