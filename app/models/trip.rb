class Trip < ApplicationRecord
    
    # belongs_to :user 
    # belongs_to :place
    has_many_attached :attachments

    def attachment_urls
        attachments.map{|attached| Rails.application.routes.url_helpers.url_for(attached)}
        
    end
end
