const express = require('express');
const { supabase } = require('../config/supabase');
const { requireAuth, ADMIN_ACCESS_TOKEN, getAdminUser } = require('../middleware/requireAuth');

const ADMIN_EMAIL = 'admin@fretron.com';
const ADMIN_PASSWORD = 'FretronAdmin123';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, role } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Email and password are required.' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
          role: role || 'business',
        },
      },
    });

    if (error) {
      return res.status(400).json({ ok: false, message: error.message });
    }

    return res.json({
      ok: true,
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Signup failed.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '').trim();

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ ok: false, message: 'Email and password are required.' });
    }

    if (normalizedEmail === ADMIN_EMAIL && normalizedPassword === ADMIN_PASSWORD) {
      const user = getAdminUser();
      return res.json({
        ok: true,
        user,
        session: null,
        access_token: ADMIN_ACCESS_TOKEN,
        refresh_token: null,
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: normalizedPassword,
    });

    if (error) {
      return res.status(401).json({ ok: false, message: error.message });
    }

    return res.json({
      ok: true,
      user: data.user,
      session: data.session,
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Login failed.' });
  }
});

router.post('/logout', requireAuth, async (req, res) => {
  try {
    if (req.accessToken === ADMIN_ACCESS_TOKEN) {
      return res.json({ ok: true, message: 'Logged out.' });
    }

    const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${req.accessToken}`,
      },
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      return res.status(400).json({
        ok: false,
        message: payload?.msg || payload?.message || 'Failed to revoke session.',
      });
    }

    return res.json({ ok: true, message: 'Logged out and session revoked.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Logout failed.' });
  }
});

router.get('/me', requireAuth, (req, res) => {
  return res.json({ ok: true, user: req.user });
});

module.exports = router;
