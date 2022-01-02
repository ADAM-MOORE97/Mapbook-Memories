class AddPlaceSerializer < ActiveModel::Serializer
    attributes :name, :longitude, :latitude, :visited, :id
  
  end