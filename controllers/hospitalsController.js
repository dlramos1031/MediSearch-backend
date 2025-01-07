const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const getAllHospitals = async (req, res) => {
  try {
    const { data, error } = await supabase.from('hospital').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('hospital')
      .select('*')
      .eq('hospital_id', id)
      .single(); // Fetch single record by ID

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHospitalsBySpecialization = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('hospital_specialization')
      .select('hospital_id, specialization_id')
      .eq('specialization_id', id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchHospitalsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const { data, error } = await supabase
      .from('hospital')
      .select('*')
      .ilike('name', `%${name}%`);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHospitalsByProximity = async (req, res) => {
  const { lat, lng, radius } = req.query;
  // Logic to filter by proximity (simplified version; more complex would use PostGIS or external APIs)
  try {
    const { data, error } = await supabase.from('hospital').select('*');
    if (error) throw error;

    // Example filter logic
    const nearbyHospitals = data.filter((hospital) => {
      const distance = Math.sqrt(
        Math.pow(hospital.latitude - lat, 2) + Math.pow(hospital.longitude - lng, 2)
      );
      return distance <= radius;
    });

    res.json(nearbyHospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHospitals,
  getHospitalById,
  getHospitalsBySpecialization,
  searchHospitalsByName,
  getHospitalsByProximity,
};
