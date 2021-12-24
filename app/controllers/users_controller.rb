class UsersController < ApplicationController
    def create
    
        user = User.find_or_create_by!(email: params[:email]) do |user|
    user.password = params[:password]
    user.password_confirmation = params[:password_confirmation]
    user.name = params[:name]
    user.givenName = params[:givenName]
    user.imageUrl = params[:imageUrl]
        end
# byebug
        session[:user_id] = user.id
        render json: user, status: :created
        
end
end
