class PlacesController < ApplicationController
    def index
        if @current_user
            # byebug
        places = @current_user.places.all
        render json: places
        else 
            render json:[error: 'Not Found, No Current User'], status: 404
        end
    end
  
end
