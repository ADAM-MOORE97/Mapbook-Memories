class TripsController < ApplicationController
    def index
        if @current_user
            # byebug
            render json: @current_user.trips.all.map{|post| TripSerializer.new(post).serializable_hash[:data][:attributes]}
        else 
            render json:[error: 'Not Found, No Current User'], status: 404
        end
    end
    def show
        if @current_user
            trip = Trip.find(params[:id])
            render json: TripSerializer.new(trip).serializable_hash[:data][:attributes], status: 200
        else
            render json: {errors: ["You are not logged in"]}, status: :unauthorized
        end
    end
    def create
        trip = Trip.new(trip_params)
        trip.to_json(include: [:attachments])
        if trip.save
            render json: TripSerializer.new(trip).serializable_hash[:data][:attributes], status: 200
        else
            render json: trip.errors, status: :unprocessable_entity
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
        params.permit(:name, :user_id, :place_id, attachments: [])
    end

end
