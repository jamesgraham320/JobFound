class ContactsController < ApplicationController
  def create
    contact = Contact.create(contact_params)
    render json: contact
  end

  def update
    contact = Contact.find(params["id"])
    contact.update(contact_params)
    render json: contact
  end

  def delete
    Contact.destroy(params["id"])
    render json: 'deleted'
  end

  private
  def contact_params
    params.require(:contact).permit(:name, :email, :phone_num)
  end
end
