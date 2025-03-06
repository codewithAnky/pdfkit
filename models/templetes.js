
import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML or plain text template
    uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Template || mongoose.model('Template', TemplateSchema);
