class CreateSlides < ActiveRecord::Migration[6.0]
  def change
    create_table :slides do |t|
      t.integer :order
      t.references :presentation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
