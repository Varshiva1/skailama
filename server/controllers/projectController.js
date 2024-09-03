import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

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
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    const formattedProjects = projects.map(project => ({
      id: project._id,
      title: project.title,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }));
    res.status(200).json(formattedProjects);
  } catch (err) {
    console.error('Error in getProjects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};