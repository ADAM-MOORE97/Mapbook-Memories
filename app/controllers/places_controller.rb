class PlacesController < ApplicationController
    def index
        if @current_user
            # byebug
        places = @current_user.places.all
        render json: places, status: :ok
        else 
            render json:[error: 'Not Found, No Current User'], status: 404
        end
    end
    def create
        if @current_user
        place = @current_user.places.create!(place_params)
        render json: place, status: :created
        else
            render json: {errors: ["You are not Logged in"]}, status: :unauthorized
        end
    end
    def show
        if @current_user
            place = Place.find(params[:id])
            render json: place, status: :ok
        else
            render json: {errors: ["You are not logged in"]}, status: :unauthorized
        end
    end
    def update
        if @current_user
            place = @current_user.places.find_by(id: params[:id])
            place.update!(place_params)
            # byebug
            render json: place, status: :ok
        else
            render json: {errors: ["You are not logged in"]}, status: :unauthorized
        end
    end
    def destroy
      if @current_user
        place = @current_user.places.find(params[:id])
        place.destroy
        head :no_content
      end
    end
    private
  def place_params
      params.permit(:name, :longitude, :latitude, :description, :visited, :id)
  end
end
