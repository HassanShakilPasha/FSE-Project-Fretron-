const USERS_KEY = "fse_users";
const SESSION_KEY = "fse_session";
const ROUTES_KEY = "fse_routes";

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

export function getUsers() {
  return readJson(USERS_KEY, []);
}

export function registerUser({ name, email, password, role }) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const userExists = users.some((user) => user.email === normalizedEmail);

  if (userExists) {
    return { ok: false, message: "An account with this email already exists." };
  }

  const newUser = {
    id: Date.now().toString(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    createdAt: new Date().toISOString(),
  };

  writeJson(USERS_KEY, [...users, newUser]);
  return { ok: true, user: newUser };
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (candidate) =>
      candidate.email === normalizedEmail && candidate.password === password
  );

  if (!user) {
    return { ok: false, message: "Invalid email or password." };
  }

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  writeJson(SESSION_KEY, sessionUser);
  return { ok: true, user: sessionUser };
}

export function getCurrentUser() {
  return readJson(SESSION_KEY, null);
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getRoutes() {
  return readJson(ROUTES_KEY, []);
}

export function createRoute(routeInput, transporterId) {
  const routes = getRoutes();
  const newRoute = {
    id: Date.now().toString(),
    transporterId,
    source: routeInput.source.trim(),
    destination: routeInput.destination.trim(),
    departureDate: routeInput.departureDate,
    availableCapacity: Number(routeInput.availableCapacity),
    pricePerKg: Number(routeInput.pricePerKg),
    vehicleType: routeInput.vehicleType,
    description: routeInput.description.trim(),
    status: "available",
    createdAt: new Date().toISOString(),
  };

  writeJson(ROUTES_KEY, [...routes, newRoute]);
  return newRoute;
}

export function getRoutesByTransporter(transporterId) {
  const routes = getRoutes();
  return routes.filter((route) => route.transporterId === transporterId);
}
