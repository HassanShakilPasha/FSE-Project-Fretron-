const { supabase } = require('../config/supabase');

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ ok: false, message: 'Missing bearer token.' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ ok: false, message: 'Invalid or expired token.' });
    }

    req.user = data.user;
    req.accessToken = token;
    return next();
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Failed to verify auth token.' });
  }
}

module.exports = { requireAuth };
