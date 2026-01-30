require "rails_helper"

RSpec.describe Task, type: :model do
  it "is valid with title and description" do
    task = Task.new(title: "Test task", description: "Test description", completed: false)
    expect(task).to be_valid
  end

  it "is invalid without title" do
    task = Task.new(title: nil, description: "Test description")
    expect(task).not_to be_valid
  end

  it "is invalid without description" do
    task = Task.new(title: "Test task", description: nil)
    expect(task).not_to be_valid
  end
end
