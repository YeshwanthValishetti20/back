const Admin = require("./api/models/adminModel"); // Adjust the path based on your project structure
const connectDB = require("./config/dbConfig");

connectDB();


//Create an instance of the Student model
const newAdminone = new Admin({
  userId: "rolex", // replace with your desired userId
  password: "callmesir", // replace with your desired password
});
//---------------------------------------------------------------------------
// Save the instance to the database
newAdminone
  .save()
  .then(() => {
    console.log("Admin data inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting Admin data:", error);
  })
  .finally(() => {
    // Close the connection after inserting data
    process.exit(0);
  });
