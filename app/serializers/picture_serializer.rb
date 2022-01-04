class PictureSerializer 
  include JSONAPI::Serializer
  attributes :id, :trip_id, :attachment_url
  # def attachment
  #   rails_blob_path(object.attachment, only_path: true) if object.attachment.attached?
  # end
end
