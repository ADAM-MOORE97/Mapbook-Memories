class AddTakenToTrips < ActiveRecord::Migration[6.1]
  def change
    add_column :trips, :taken, :boolean, default: false
  end
end
