class User < ActiveRecord::Base
  has_secure_password

  has_many :posts

  validates :email, presence: true, uniqueness: true
  validates :token, uniqueness: true, if: Proc.new { |u| u.token.present? }

  before_create :generate_token

  def generate_token
    self.token = rand(36 ** 10).to_s(36)
  end
end
