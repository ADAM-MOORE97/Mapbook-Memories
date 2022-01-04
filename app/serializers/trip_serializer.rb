class TripSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :start_date, :end_date, :description, :taken, :place_id, :attachment_urls


end
