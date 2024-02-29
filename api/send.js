const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://kcxgeurvltlylopegioj.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjeGdldXJ2bHRseWxvcGVnaW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMzc0NzQsImV4cCI6MjAyNDcxMzQ3NH0.bGikR5Cx0KCntsvxw7ductXg18TiBVhMwBFAfF6DJ10'; // Replace with your Supabase service key
const supabase = createClient(supabaseUrl, supabaseKey);

// POST endpoint to handle form submission
router.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      // Insert data into Supabase database
      const { data, error } = await supabase
      .from('submission')
      .insert([
        { name, email, message }
      ]);
  
      console.log('Data:', { name, email, message });
  
      if (error) {
        console.error('Error inserting data into Supabase:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
        return;
      }
  
      console.log('Data inserted into Supabase:', data);
      res.status(200).json({ message: 'Data submitted successfully' });
    } catch (error) {
      console.error('Error inserting data into Supabase:', error.message);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  });  

module.exports = router;
