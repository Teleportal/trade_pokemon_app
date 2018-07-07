json.extract! user, :id, :friend_code, :name, :avatar, :contact_info, :location, :created_at, :updated_at
json.url user_url(user, format: :json)
