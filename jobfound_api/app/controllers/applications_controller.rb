class ApplicationsController < ApplicationController
  def index
    applications = Application.all
    render json: applications
  end

  def show

  end

  def create
  end

  def edit

  end

  def delete

  end

end
