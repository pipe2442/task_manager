# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

tasks = [
  { title: "Buy groceries", description: "Milk, eggs, bread, fruits and vegetables." },
  { title: "Finish monthly report", description: "Complete the monthly report and send it by email." },
  { title: "Call the doctor", description: "Schedule the annual appointment and confirm availability.", completed: true },
  { title: "Update dependencies", description: "Update gems and run the test suite.", completed: true },
  { title: "Clean inbox", description: "Archive and reply to important emails." }
]

tasks.each do |attrs|
  task = Task.find_or_initialize_by(title: attrs[:title])
  task.assign_attributes(attrs)
  task.save!
end
