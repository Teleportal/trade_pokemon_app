class AddAddressToUsers < ActiveRecord::Migration[5.1]
  def change
    enable_extension "hstore"
    add_column :users, :address, :hstore
  end
end
