import express from 'express';
const app = express();
const port = 3000;

app.post('/', (req, res) => {
  // Retrieve values from headers
  const doctorEmail = req.headers['doctor-email'];
  const patientEmail = req.headers['patient-email'];

  // You can now use these values as needed
  console.log('Doctor Email:', doctorEmail);
  console.log('Patient Email:', patientEmail);

  // Handle your logic here

  res.json({doctorEmail, patientEmail});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
