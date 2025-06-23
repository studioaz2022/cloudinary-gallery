// /api/gallery.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'di2bzhkhc',
  api_key: '798394421274572',
  api_secret: 'mpHAOXMh7TM0JP9_xgp-slmiNSA'
});

export default async function handler(req, res) {
  try {
    const result = await cloudinary.search
      .expression('folder:artists')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();

    const resources = result.resources.map(file => ({
      public_id: file.public_id,
      format: file.format,
      type: file.resource_type,
      secure_url: file.secure_url
    }));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ files: resources });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load gallery' });
  }
}
