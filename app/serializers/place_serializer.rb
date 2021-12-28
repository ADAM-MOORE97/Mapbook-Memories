class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :longitude, :latitude, :description
  has_one :user
end
