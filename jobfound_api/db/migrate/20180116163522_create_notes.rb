class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.string :content
      t.integer :stage_id
      t.integer :contact_id

      t.timestamps
    end
  end
end
