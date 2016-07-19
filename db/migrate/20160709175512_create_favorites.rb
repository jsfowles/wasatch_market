class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
    	t.belongs_to :user, dependent: :destroy
      t.integer :vendor_id

      t.timestamps null: false
    end
  end
end
