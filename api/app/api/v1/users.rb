module Api
  module V1
    class Users < Grape::API
      helpers UserHelpers

      resources :users do
        params do
          requires :user, type: Hash do
            requires :email, type: String
            requires :password, type: String
          end
        end
        post do
          User.create!(params[:user])
        rescue StandardError => e
          status 422
          {error: e.message}
        end

        params do
          requires :user, type: Hash do
            requires :email, type: String
            requires :password, type: String
          end
        end
        post '/sign_in' do
          user = User.find_by(email: params[:user][:email])
          raise "Incorrect email or password" unless user&.authenticate(params[:user][:password])

          user.generate_token
          user.save!
          { token: user.token, email: user.email }
        rescue StandardError => e
          status 422
          {error: e.message}
        end

        get '/me' do
          return current_user if current_user
          status 401
        end

        delete '/sign_out' do
          if current_user
            current_user.update!(token: nil)
          end

          status 204
          ""
        end
      end
    end
  end
end
