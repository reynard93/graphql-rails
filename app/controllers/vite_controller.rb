class ViteController < ApplicationController
  def index
    index_path = Rails.root.join("public/index.html")
    if File.exist?(index_path)
      render file: index_path
    else
      render html: "", layout: false, status: :not_found
    end
  end
end
