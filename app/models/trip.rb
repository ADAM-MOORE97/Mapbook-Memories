class Trip < ApplicationRecord
    
    belongs_to :user 
    belongs_to :place
    has_many_attached :images
end
