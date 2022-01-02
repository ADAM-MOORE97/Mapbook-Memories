class Place < ApplicationRecord
  has_many :trips, dependent: :destroy
  belongs_to :user
end
