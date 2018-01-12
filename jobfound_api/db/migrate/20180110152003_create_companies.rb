class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.integer :application_id
      t.string :name
      t.string :address

      t.timestamps
    end
  end
end
