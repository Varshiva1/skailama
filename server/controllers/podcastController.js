import Podcast from '../models/Podcast.js';
import Project from '../models/Project.js';

export const addPodcast = async (req, res) => {
  try {
    const { name, link } = req.body;
    const { projectId } = req.params;

    if (!name || !link) {
      return res.status(400).json({ error: 'Podcast name and link are required' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const newPodcast = await Podcast.create({ name, link, projectId });
    res.status(201).json({
      message: 'Podcast added successfully',
      podcast: {
        id: newPodcast._id,
        name: newPodcast.name,
        link: newPodcast.link,
        uploadTime: newPodcast.uploadTime
      }
    });
  } catch (err) {
    console.error('Error in addPodcast:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPodcasts = async (req, res) => {
  try {
    const { projectId } = req.params;
    const podcasts = await Podcast.find({ projectId }).sort({ uploadTime: -1 });
    const formattedPodcasts = podcasts.map(podcast => ({
      id: podcast._id,
      name: podcast.name,
      link: podcast.link,
      uploadTime: podcast.uploadTime
    }));
    res.status(200).json(formattedPodcasts);
  } catch (err) {
    console.error('Error in getPodcasts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const editPodcast = async (req, res) => {
  try {
    const { podcastId } = req.params;
    const { name, link } = req.body;

    if (!name && !link) {
      return res.status(400).json({ error: 'At least one field (name or link) is required for update' });
    }

    const updatedPodcast = await Podcast.findByIdAndUpdate(
      podcastId,
      { $set: { name, link } },
      { new: true }
    );

    if (!updatedPodcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    res.status(200).json({
      message: 'Podcast updated successfully',
      podcast: {
        id: updatedPodcast._id,
        name: updatedPodcast.name,
        link: updatedPodcast.link,
        uploadTime: updatedPodcast.uploadTime
      }
    });
  } catch (err) {
    console.error('Error in editPodcast:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePodcast = async (req, res) => {
  try {
    const { podcastId } = req.params;

    const deletedPodcast = await Podcast.findByIdAndDelete(podcastId);

    if (!deletedPodcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    res.status(200).json({
      message: 'Podcast deleted successfully',
      podcast: {
        id: deletedPodcast._id,
        name: deletedPodcast.name,
        link: deletedPodcast.link,
        uploadTime: deletedPodcast.uploadTime
      }
    });
  } catch (err) {
    console.error('Error in deletePodcast:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};