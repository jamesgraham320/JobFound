class ApplicationsController < ApplicationController

  def create
    app = Application.create(application_params)
    company = Company.new(company_params)
    Stage.create(application: app)
    company.application = app
    company.save
    render json: app
  end

  private

  def application_params
    params.require(:application).permit(:user_id)
  end

  def company_params
    params.require(:company).permit(:name, :address, :source)
  end
end
