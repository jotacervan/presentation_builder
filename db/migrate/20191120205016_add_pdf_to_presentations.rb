class AddPdfToPresentations < ActiveRecord::Migration[6.0]
  def change
    add_column :presentations, :pdf, :string
  end
end
