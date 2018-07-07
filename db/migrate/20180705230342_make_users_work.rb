class MakeUsersWork < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :user_name, :name
    add_column :users, :email, :string
    add_column :users, :password_disgest, :string
  end
end
