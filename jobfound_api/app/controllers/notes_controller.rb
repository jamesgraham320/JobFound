class NotesController < ApplicationController
  def create
    note = Note.create(note_params)
    render json: note
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy
    render json: {message: "all clear"}
  end
  
  private

  def note_params
    params.require(:note).permit(:stage_id, :content, :contact_id)
  end
  
end
