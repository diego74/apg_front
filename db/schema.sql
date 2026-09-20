CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Administrador APG',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS players (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  club TEXT,
  points INTEGER NOT NULL DEFAULT 0 CHECK (points >= 0),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teams (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  city TEXT,
  played INTEGER NOT NULL DEFAULT 0 CHECK (played >= 0),
  won INTEGER NOT NULL DEFAULT 0 CHECK (won >= 0),
  drawn INTEGER NOT NULL DEFAULT 0 CHECK (drawn >= 0),
  lost INTEGER NOT NULL DEFAULT 0 CHECK (lost >= 0),
  walkovers INTEGER NOT NULL DEFAULT 0 CHECK (walkovers >= 0),
  points_for INTEGER NOT NULL DEFAULT 0 CHECK (points_for >= 0),
  points_against INTEGER NOT NULL DEFAULT 0 CHECK (points_against >= 0),
  difference INTEGER NOT NULL DEFAULT 0,
  points INTEGER NOT NULL DEFAULT 0 CHECK (points >= 0),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled')),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS events_date_idx ON events (event_date);
CREATE INDEX IF NOT EXISTS players_points_idx ON players (points DESC);
CREATE INDEX IF NOT EXISTS teams_points_idx ON teams (points DESC);

-- Ranking oficial XXX Torneo Mario Akamine 2026. El UPSERT permite ejecutar
-- este esquema más de una vez sin duplicar equipos.
INSERT INTO teams (name, played, won, drawn, lost, walkovers, points_for, points_against, difference, points, active)
VALUES
  ('LA CAPITANA A', 11, 8, 1, 2, 0, 141, 93, 48, 25, TRUE),
  ('SHUREY KAIZEN', 11, 7, 1, 3, 0, 136, 102, 34, 22, TRUE),
  ('NIKKYO F', 11, 7, 1, 3, 0, 136, 113, 23, 22, TRUE),
  ('AELU 16', 11, 6, 1, 4, 0, 122, 121, 1, 19, TRUE),
  ('OKINAWA D', 11, 6, 1, 4, 0, 119, 120, -1, 19, TRUE),
  ('SAN AGUSTIN C', 11, 6, 0, 6, 0, 124, 114, 10, 18, TRUE),
  ('AELU 23', 11, 5, 0, 6, 0, 116, 117, -1, 15, TRUE),
  ('LA CAPITANA B', 11, 5, 0, 6, 0, 115, 126, -11, 15, TRUE),
  ('ODAWARA', 11, 4, 0, 7, 0, 113, 137, -24, 12, TRUE),
  ('ANC', 11, 4, 0, 7, 0, 101, 131, -30, 12, TRUE),
  ('AELU 26', 11, 3, 0, 8, 0, 101, 141, -40, 9, TRUE),
  ('LA CAPITANA D', 11, 2, 1, 8, 0, 109, 118, -9, 7, TRUE)
ON CONFLICT (name) DO UPDATE SET
  played = EXCLUDED.played, won = EXCLUDED.won, drawn = EXCLUDED.drawn,
  lost = EXCLUDED.lost, walkovers = EXCLUDED.walkovers,
  points_for = EXCLUDED.points_for, points_against = EXCLUDED.points_against,
  difference = EXCLUDED.difference, points = EXCLUDED.points, active = TRUE;
