const { supabase } = require('../config/supabase');

const ADMIN_EMAIL = 'admin@fretron.com';
const ADMIN_ACCESS_TOKEN = 'fretron-admin-static-token';

function getAdminUser() {
  return {
    id: 'admin-user',
    email: ADMIN_EMAIL,
    name: 'Admin',
    role: 'admin',
    activeRole: 'admin',
    user_metadata: {
      name: 'Admin',
      role: 'admin',
    },
  };
}

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ ok: false, message: 'Missing bearer token.' });
    }

    if (token === ADMIN_ACCESS_TOKEN) {
      req.user = getAdminUser();
      req.accessToken = token;
      return next();
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

module.exports = { requireAuth, ADMIN_ACCESS_TOKEN, getAdminUser };
