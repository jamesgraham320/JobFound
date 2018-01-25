class StagesController < ApplicationController
  def create
    currentStage = Stage.find(params[:id])
    currentStage.update(end: DateTime.now)
    if params['direction'] === "next"
      case currentStage.name
      when "Submitted"
        currentStage.name = "Interviewing"
      when "Interviewing"
        currentStage.name = "Offer"
      end
    elsif params["direction"] === "prev"
      case currentStage.name
      when "Interviewing"
        currentStage.name = "Submitted"
      when "Offer"
        currentStage.name = "Interviewing"
      end
    elsif params["direction"] === "close"
      currentStage.name = "Closed"
    elsif params["direction"] === "open"
      currentStage.name = "Submitted"
    end
    currentStage.save
    render json: currentStage
  end
end
