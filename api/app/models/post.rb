class Post < ActiveRecord::Base
  belongs_to :user, required: true

  validates :title, :body, presence: true

  mount_uploader :cover, CoverUploader
end
