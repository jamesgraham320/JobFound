class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.string :family_name
      t.string :given_name
      t.string :email
      t.string :phone
      t.string :image_url
      t.string :code
      t.string :id_token
      t.string :access_token
      t.string :refresh_token
      t.string :expires_in
      t.string :token_type

      t.timestamps
    end
  end
end
