const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Fetch all specializations
const getAllSpecializations = async (req, res) => {
  try {
    const { data, error } = await supabase.from('specialization').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new specialization
const addSpecialization = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Specialization name is required' });
  }

  try {
    const { data, error } = await supabase.from('specialization').insert([{ name }]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSpecializations,
  addSpecialization,
};
