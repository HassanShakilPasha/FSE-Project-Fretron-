const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();
const DATA_DIR = path.join(__dirname, '..', 'data');
const ROUTES_FILE = path.join(DATA_DIR, 'routes.json');

const initDataFilesPromise = ensureDataFiles();

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(ROUTES_FILE);
  } catch {
    await fs.writeFile(ROUTES_FILE, '[]', 'utf8');
  }
}

async function readRoutes() {
  await initDataFilesPromise;
  const raw = await fs.readFile(ROUTES_FILE, 'utf8');
  const parsed = JSON.parse(raw || '[]');
  return Array.isArray(parsed) ? parsed : [];
}

async function writeRoutes(routes) {
  await initDataFilesPromise;
  await fs.writeFile(ROUTES_FILE, JSON.stringify(routes, null, 2), 'utf8');
}

router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'backend-api' });
});

router.get('/profile', requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

router.get('/routes', async (_req, res) => {
  try {
    const routes = await readRoutes();
    return res.json({ ok: true, routes });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Failed to fetch routes.' });
  }
});

router.get('/routes/transporter/:transporterId', requireAuth, async (req, res) => {
  try {
    const { transporterId } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== transporterId) {
      return res.status(403).json({ ok: false, message: 'Forbidden for this transporter.' });
    }

    const routes = await readRoutes();
    const filtered = routes.filter((route) => route.transporterId === transporterId);
    return res.json({ ok: true, routes: filtered });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Failed to fetch transporter routes.' });
  }
});

router.post('/routes', requireAuth, async (req, res) => {
  try {
    const {
      source,
      destination,
      departureDate,
      expectedArrivalDate,
      availableCapacity,
      pricePerKg,
      vehicleType,
      description,
    } = req.body || {};

    if (!source || !destination || !departureDate || !availableCapacity || !pricePerKg) {
      return res.status(400).json({
        ok: false,
        message: 'source, destination, departureDate, availableCapacity, and pricePerKg are required.',
      });
    }

    const routes = await readRoutes();
    const newRoute = {
      id: crypto.randomUUID(),
      transporterId: req.user.id,
      source: String(source).trim(),
      destination: String(destination).trim(),
      departureDate: String(departureDate),
      expectedArrivalDate: expectedArrivalDate ? String(expectedArrivalDate) : '',
      availableCapacity: Number(availableCapacity),
      pricePerKg: Number(pricePerKg),
      vehicleType: vehicleType ? String(vehicleType) : '',
      description: description ? String(description).trim() : '',
      status: 'available',
      createdAt: new Date().toISOString(),
    };

    routes.push(newRoute);
    await writeRoutes(routes);

    return res.json({ ok: true, route: newRoute });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Failed to create route.' });
  }
});

module.exports = router;
