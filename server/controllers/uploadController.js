import Podcast from '../models/Podcast.js';

export const addPodcast = async (req, res) => {
  try {
    const { title, description, url, source } = req.body;
    const projectId = req.params.projectId;

    if (!title || !url || !source) {
      return res.status(400).json({ error: 'Title, URL, and source are required' });
    }

    const newPodcast = await Podcast.create({
      title,
      description,
      url,
      source,
      projectId
    });

    res.status(201).json(newPodcast);
  } catch (err) {
    console.error('Error in addPodcast:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPodcasts = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const podcasts = await Podcast.find({ projectId });
    res.status(200).json(podcasts);
  } catch (err) {
    console.error('Error in getPodcasts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};