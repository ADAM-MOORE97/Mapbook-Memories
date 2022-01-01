class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :longitude, :latitude, :description, :visited

end
