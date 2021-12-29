class AddVisitedToPlaces < ActiveRecord::Migration[6.1]
  def change
    add_column :places, :visited, :boolean, default: false
  end
end
