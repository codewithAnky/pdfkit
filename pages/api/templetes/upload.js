import dbConnect from '../../../lib/dbConnect';
import Template from '../../../models/Template';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { title, content, uploaded_by } = req.body;

        const newTemplate = new Template({ title, content, uploaded_by });
        await newTemplate.save();

        res.status(201).json({ message: 'Template uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
