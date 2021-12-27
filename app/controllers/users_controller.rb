class UsersController < ApplicationController
    
    def show
        if @current_user
            
            if params[:id]
                render json: User.find(params[:id])
            elsif params[:email]
                render json: User.find_by!(email: params[:email])
            else
                render json: @current_user, status: :ok 
            end 
        else
            render json: {errors: ["Not authenticated"]}, status: :unauthorized
        end
    end
    def create
    
        user = User.find_or_create_by!(email: params[:email]) do |user|
    user.password = params[:password]
    user.password_confirmation = params[:password_confirmation]
    user.name = params[:name]
    user.givenName = params[:givenName]
    user.imageUrl = params[:imageUrl]
        end
# byebug
    # session[:user_id] = user.id
    render json: user, status: :created
    end
end
