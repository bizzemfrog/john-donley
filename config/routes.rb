Solitaire::Application.routes.draw do
  
  scope "api" do 
    resources :cards
  end
  
  root to: "main#index"
  
end
