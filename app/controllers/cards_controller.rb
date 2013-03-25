class CardsController < ApplicationController
  
  respond_to :json

  def index
    respond_with Card.all
  end

  def show
    respond_with Card.find(params[:id])
  end

  def create
    respond_with Card.create(params[:entry])
  end

  def update
    respond_with Card.update(params[:id], params[:card])
  end

  def destroy
    respond_with Card.destroy(params[:id])
  end
  
end
