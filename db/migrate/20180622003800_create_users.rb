class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :friend_code
      t.string :user_name
      t.string :avatar
      t.string :contact_info
      t.string :location

      t.timestamps
    end
  end
end
