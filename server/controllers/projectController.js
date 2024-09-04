import Project from '../models/Project.js';
import Podcast from '../models/Podcast.js';

export const createProject = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;
    console.log(userId,"userid")

    if (!title) {
      return res.status(400).json({ error: 'Project title is required' });
    }

    const newProject = await Project.create({ title, userId });
    res.status(201).json({
      message: 'Project created successfully',
      project: {
        id: newProject._id,
        title: newProject.title,
        createdAt: newProject.createdAt,
        updatedAt: newProject.updatedAt
      }
    });
  } catch (err) {
    console.error('Error in createProject:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Retrieve projects with the userId
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    
    // Get the count of podcasts for each project
    const projectIds = projects.map(project => project._id);
    const podcastsCount = await Podcast.aggregate([
      { $match: { projectId: { $in: projectIds } } },
      { $group: { _id: "$projectId", count: { $sum: 1 } } }
    ]);
    
    // Create a map of projectId to podcast count
    const podcastCountMap = podcastsCount.reduce((map, item) => {
      map[item._id.toString()] = item.count;
      return map;
    }, {});

    // Format projects with the episodes count
    const formattedProjects = projects.map(project => ({
      id: project._id,
      title: project.title,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      episodes: podcastCountMap[project._id.toString()] || 0 
    }));

    res.status(200).json({ projects: formattedProjects });
  } catch (err) {
    console.error('Error in getProjects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

