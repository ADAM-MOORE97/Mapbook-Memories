class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :givenName, :email, :password_digest, :imageUrl
end
