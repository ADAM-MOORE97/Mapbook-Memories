class SessionsController < ActionController::Base
    include ActionController::Cookies
    skip_before_action :verify_authenticity_token

    def create
     
      user = User.find_by(email: params[:email])
      # byebug
      p user
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
    
        render json: user, status: :ok
      
      else
        
        render json: { errors: ["Invalid login credentials."] }, status: :unauthorized
      end
    end
  
    def destroy
      # byebug
      session.delete :user_id
      head :no_content
    end
  
  end