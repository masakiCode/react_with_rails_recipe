class Api::V1::RecipesController < ApplicationController
  def index
    recipe = Recipe.all.order(created_at: :desc)
    render json: recipe
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
     render json: recipe
    else
      render json: recipe.errors
    end
  end

  def update
    recipe = Recipe.find(params["id"])
    recipe.update_attributes(recipe_params)
    respond_with recipe, json: recipe
  end

  def show
    if recipe
     render json: recipe
    else
     render json: recipe.errors
    end
  end

  def destroy
    recipe&.destroy
    render json: { message: 'Recipe Deleted!' }
  end

  private

  def recipe_params
    params.permit(:name, :image, :ingredients, :instruction)
  end

  def recipe
    @recipe ||= Recipe.find(params[:id])
  end
end
