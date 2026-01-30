require "rails_helper"

RSpec.describe "Tasks API", type: :request do
  describe "GET /api/tasks" do
    it "returns a list of tasks" do
      Task.delete_all
      Task.create!(title: "Task 1", description: "Desc 1", completed: false)
      Task.create!(title: "Task 2", description: "Desc 2", completed: true)

      get "/api/tasks"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
    end
  end

  describe "POST /api/tasks" do
    it "creates a task with valid params" do
      params = { task: { title: "New Task", description: "New Desc", completed: false } }

      post "/api/tasks", params: params

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["title"]).to eq("New Task")
    end

    it "returns errors with invalid params" do
      params = { task: { title: "", description: "" } }

      post "/api/tasks", params: params

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to be_present
    end
  end
end
