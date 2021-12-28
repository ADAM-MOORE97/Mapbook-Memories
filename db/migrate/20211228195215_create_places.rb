class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|
      t.string :name
      t.decimal :longitude
      t.decimal :latitude
      t.string :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
