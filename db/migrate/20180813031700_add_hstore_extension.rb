class AddHstoreExtension < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :location
  end
  def self.up
    enable_extension "hstore"
  end
  def self.down
    disable_extension "hstore"
  end
end
