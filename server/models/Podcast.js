import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  link: { 
    type: String, 
    required: true 
  },
  uploadTime: { 
    type: Date, 
    default: Date.now 
  },
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
    required: true 
  }
});

export default mongoose.model('Podcast', podcastSchema);