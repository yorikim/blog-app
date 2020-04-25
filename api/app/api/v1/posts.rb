module Api
  module V1
    class Posts < Grape::API
      helpers UserHelpers

      resources :posts do
        before do
          $base_url = request.base_url
        end

        get do
          Post.eager_load(:user).order('posts.created_at DESC')
        end

        get ':id' do
          Post.find(params[:id])
        end

        params do
          requires :post, type: Hash do
            requires :title, type: String
            requires :body, type: String
            optional :cover, type: Rack::Multipart::UploadedFile
          end
        end
        patch ':id' do
          post = current_user.posts.find(params[:id])
          post.update!(params[:post])

          status 204
          ""
        end

        delete ':id' do
          post = current_user.posts.find(params[:id])
          post.destroy!

          status 204
          ""
        end

        get ':id/cover' do
          post = Post.find(params[:id])
          filename = post.cover.path
          content_type MIME::Types.type_for(filename)[0].to_s
          env['api.format'] = :binary
          header 'Content-Disposition', "attachment; filename*=UTF-8''#{URI.escape(filename)}"
          post.cover.file.read
        end

        params do
          requires :post, type: Hash do
            requires :title, type: String
            requires :body, type: String
            optional :cover, type: Rack::Multipart::UploadedFile
          end
        end
        post do
          current_user.posts.create!(params[:post])
        end
      end
    end
  end
end
