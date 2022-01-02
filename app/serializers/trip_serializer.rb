class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :description, :taken, :images
  belongs_to :place, serializer: AddPlaceSerializer
end
