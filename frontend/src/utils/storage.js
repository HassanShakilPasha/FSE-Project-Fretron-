const SESSION_KEY = "fse_session";
const SESSION_TOKEN_KEY = "fse_access_token";
const SESSION_REFRESH_TOKEN_KEY = "fse_refresh_token";
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const AUTH_API_BASE_URL = process.env.REACT_APP_AUTH_API_URL || API_BASE_URL;

function readJson(key, fallbackValue) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function apiRequest(path, options = {}) {
  const baseUrl = options.baseUrl || API_BASE_URL;
  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload;
}

export async function registerUser({ name, email, password, role }) {
  try {
    const payload = await apiRequest("/auth/signup", {
      method: "POST",
      baseUrl: AUTH_API_BASE_URL,
      body: { name, email, password, role },
    });
    return { ok: true, user: payload.user };
  } catch (error) {
    return { ok: false, message: error.message || "Registration failed." };
  }
}

export async function loginUser({ email, password }) {
  try {
    const payload = await apiRequest("/auth/login", {
      method: "POST",
      baseUrl: AUTH_API_BASE_URL,
      body: { email, password },
    });

    writeJson(SESSION_KEY, payload.user);
    if (payload.access_token) {
      localStorage.setItem(SESSION_TOKEN_KEY, payload.access_token);
    }
    if (payload.refresh_token) {
      localStorage.setItem(SESSION_REFRESH_TOKEN_KEY, payload.refresh_token);
    }
    return { ok: true, user: payload.user };
  } catch (error) {
    return { ok: false, message: error.message || "Invalid email or password." };
  }
}

export function getCurrentUser() {
  return readJson(SESSION_KEY, null);
}

export async function logoutUser() {
  const accessToken = localStorage.getItem(SESSION_TOKEN_KEY);

  if (accessToken) {
    try {
      await apiRequest("/auth/logout", {
        method: "POST",
        baseUrl: AUTH_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      // Clear local state even if remote revocation fails.
    }
  }

  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_TOKEN_KEY);
  localStorage.removeItem(SESSION_REFRESH_TOKEN_KEY);
}

export async function getRoutes() {
  try {
    const payload = await apiRequest("/api/routes");
    return payload.routes || [];
  } catch (error) {
    return [];
  }
}

export async function createRoute(routeInput, transporterId) {
  const accessToken = localStorage.getItem(SESSION_TOKEN_KEY);
  if (!accessToken) {
    throw new Error("Please log in again.");
  }

  const payload = await apiRequest("/api/routes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      source: routeInput.source.trim(),
      destination: routeInput.destination.trim(),
      departureDate: routeInput.departureDate,
      expectedArrivalDate: routeInput.expectedArrivalDate,
      availableCapacity: Number(routeInput.availableCapacity),
      pricePerKg: Number(routeInput.pricePerKg),
      vehicleType: routeInput.vehicleType,
      description: routeInput.description.trim(),
    },
  });

  return payload.route;
}

export async function getRoutesByTransporter(transporterId) {
  try {
    const accessToken = localStorage.getItem(SESSION_TOKEN_KEY);
    if (!accessToken) {
      return [];
    }

    const payload = await apiRequest(`/api/routes/transporter/${transporterId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return payload.routes || [];
  } catch (error) {
    return [];
  }
}
