module UserHelpers
  def current_user
    token = request.headers['Authorization']&.split(' ')&.last
    return nil unless token

    User.find_by(token: token)
  end
end
