class Recipe < ApplicationRecord
  validates :name, presence: true
  validates :image, presence: true
  validates :ingredients, presence: true
  validates :instruction, presence: true
end
