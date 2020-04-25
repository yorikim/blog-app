class PostSerializer < ActiveModel::Serializer
  attributes :id,
    :title,
    :body,
    :created_at

  attribute :cover do
    if object.cover.present?
      "#{$base_url}/v1/posts/#{object.id}/cover"
    else
      nil
    end
  end

  attribute :author do
    object.user.email
  end
end
