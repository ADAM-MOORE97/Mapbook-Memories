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
end
