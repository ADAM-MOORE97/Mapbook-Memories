class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :longitude, :latitude, :description, :trips, :visited
  has_one :user
end
