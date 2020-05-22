class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.text :ingredients, null: false
      t.text :instruction, null: false
      t.string :image, default: 'https://wallpaperplay.com/walls/full/e/6/0/113355.jpg'

      t.timestamps
    end
  end
end
