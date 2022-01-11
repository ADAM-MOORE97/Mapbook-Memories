class Trip < ApplicationRecord
    
    belongs_to :user 
    belongs_to :place
    has_many_attached :attachments
    validates :name, uniqueness: true

    def attachment_urls
        
        attachments.map{|attached|  Rails.application.routes.url_helpers.rails_blob_path(attached, only_path: true)}
     
        # Rails.application.routes.url_helpers.url_for(attached)
        # attachments.map{|attached| Rails.application.routes.url_helpers.rails_blob_path(attached, only_path: true)}
    
    end
end
