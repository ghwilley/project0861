class SessionsController < ApplicationController
  helper SessionsHelper

  def new
    render :layout => false
  end

  def create
    user = User.find_by(username: params[:sessions][:username])
    if user && user.authenticate(params[:sessions][:password])
      session[:user_id] = user.id
      redirect_to user_path(id: user.id)
    else
      flash.now.alert = "Meteor-WRONG! username or password"
      render "new"
    end
  end

  def destroy
      session[:user_id] = nil
      redirect_to root_url, :notice => "Logged out!"
  end
end
