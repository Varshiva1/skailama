import mongoose from 'mongoose';

const transcriptSchema = new mongoose.Schema({
  content: { type: String, required: true },
  podcastId: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast', required: true },
}, { timestamps: true });

export default mongoose.model('Transcript', transcriptSchema);