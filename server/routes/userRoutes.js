import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';
import { createProject, getProjects } from '../controllers/projectController.js';
import { addPodcast, getPodcasts, editPodcast, deletePodcast } from '../controllers/podcastController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/signup', createUser);
router.post('/login', loginUser);

// Project routes
router.post('/projects', authenticateUser, createProject);
router.get('/projects', authenticateUser, getProjects);

// Podcast routes
router.post('/projects/podcasts/:projectId', authenticateUser, addPodcast);
router.get('/projects/podcasts/:projectId', authenticateUser, getPodcasts);
router.post('/podcasts/edit/:podcastId', authenticateUser, editPodcast);
router.delete('/podcasts/:podcastId', authenticateUser, deletePodcast);

export default router;