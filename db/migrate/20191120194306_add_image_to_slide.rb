class AddImageToSlide < ActiveRecord::Migration[6.0]
  def change
    add_column :slides, :image, :string
    add_column :slides, :audio, :string
  end
end
