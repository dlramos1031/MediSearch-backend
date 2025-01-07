const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Fetch all reviews for a specific hospital
const getReviewsByHospital = async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const { data, error } = await supabase
      .from('review')
      .select('*')
      .eq('hospital_id', hospitalId);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new review
const addReview = async (req, res) => {
  const { hospital_id, rating, comment } = req.body;

  if (!hospital_id || !rating || rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ error: 'Invalid input. Hospital ID and rating (1-5) are required.' });
  }

  try {
    const { data, error } = await supabase.from('review').insert([{ hospital_id, rating, comment }]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review by its ID
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const { data, error } = await supabase.from('review').delete().eq('review_id', reviewId);
    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReviewsByHospital,
  addReview,
  deleteReview,
};
