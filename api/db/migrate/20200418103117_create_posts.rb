class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.belongs_to :user
      t.string :title
      t.text :body
      t.string :cover

      t.timestamps
    end
  end
end
