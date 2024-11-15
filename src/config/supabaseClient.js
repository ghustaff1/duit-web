// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);



import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://otbwrceflywimyepoqrs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90YndyY2VmbHl3aW15ZXBvcXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NjgzOTQsImV4cCI6MjA0NzI0NDM5NH0.iZmU6mpWyf9yQGhWvgfvTJ5JydKg3h_CdevxAlsA9TY'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;