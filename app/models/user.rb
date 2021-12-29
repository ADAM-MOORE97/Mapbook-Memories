class User < ApplicationRecord
    has_secure_password
    validates :email, uniqueness: true
    has_many :places
    has_many :trips
    has_many :trips, through: :places
end
