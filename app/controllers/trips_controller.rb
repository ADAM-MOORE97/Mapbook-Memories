class TripsController < ApplicationController
    def index
        if @current_user
            # byebug
        trips = @current_user.trips.all
        render json: trips
        else 
            render json:[error: 'Not Found, No Current User'], status: 404
        end
    end
    def show
        if @current_user
            trip = Trip.find(params[:id])
            render json: trip, status: :ok
        else
            render json: {errors: ["You are not logged in"]}, status: :unauthorized
        end
    end
    def update
        if @current_user
            trip = @current_user.trips.find_by(id: params[:id])
            trip.update!(trip_params)
            # byebug
            render json: trip, serializer: AddPlaceSerializer, status: :ok
        else
            render json: {errors: ["You are not logged in"]}, status: :unauthorized
        end
    end
    def destroy
        place = Place.find(params[:id])
        if @current_user.id == place.user_id
             place.destroy
            render json: {message: "deleted"}
        else
            render json: {errors: ["You are not logged in"]}, status: :unauthorized
        end
    end

    private

    def trip_params
        params.permit(:name, :start_date, :end_date, :description, :images, :user_id, :place_id)
    end
end
