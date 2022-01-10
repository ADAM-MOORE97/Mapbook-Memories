class Trip < ApplicationRecord
    
    belongs_to :user 
    belongs_to :place
    has_many_attached :attachments

    def attachment_urls
        img = attachments.map do |images|
            img = images.variant(resize: '300X300')
            Rails.application.routes.url_helpers.rails_blob_path(img, only_path: true)
        end
        # attachments.map{|attached|  Rails.application.routes.url_helpers.rails_blob_path(attached, only_path: true)}
     
        # Rails.application.routes.url_helpers.url_for(attached)
        # attachments.map{|attached| Rails.application.routes.url_helpers.rails_blob_path(attached, only_path: true)}
    
    end
end
