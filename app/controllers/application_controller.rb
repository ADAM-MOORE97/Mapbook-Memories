class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :current_user



  private

  def current_user
    # byebug
    @current_user = User.find_by(id: session[:user_id])
    # request.cookies['help'] = 'yes'

  end

  def render_record_invalid(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_record_not_found(error)
    render json: { errors: [error] }, status: :not_found
  end


end
