class CreatePresentations < ActiveRecord::Migration[6.0]
  def change
    create_table :presentations do |t|
      t.string :name
      t.text :description
      t.integer :status, default: 1
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
