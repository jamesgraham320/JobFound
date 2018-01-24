class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :phone_num
      t.boolean :active, default: false
      t.integer :company_id

      t.timestamps
    end
  end
end
