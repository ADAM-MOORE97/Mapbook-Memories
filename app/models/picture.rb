class Picture < ApplicationRecord
    

    has_many_attached :attachments
  
    def attributes
      {
        'id' => nil,
        'updated_at' => nil,
        'created_at' => nil,
        'attachment_url' => nil
      }
    end
  
    def attachment_url
      Rails.application.routes.url_helpers.rails_representation_url(
        attachments.variant(resize_to_limit: [200, 200]).processed, only_path: true
      )
    end
  end
