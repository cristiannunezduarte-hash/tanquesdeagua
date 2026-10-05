-- Solicitudes de cotización recibidas desde el formulario web
CREATE TABLE IF NOT EXISTS solicitudes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  creado_en   TEXT    NOT NULL DEFAULT (datetime('now')),
  nombre      TEXT    NOT NULL,
  telefono    TEXT    NOT NULL,
  email       TEXT,
  ciudad      TEXT,
  servicio    TEXT,
  capacidad   TEXT,
  mensaje     TEXT,
  pagina      TEXT,
  utm_source  TEXT,
  utm_medium  TEXT,
  utm_campaign TEXT,
  pais        TEXT,
  user_agent  TEXT,
  estado      TEXT    NOT NULL DEFAULT 'nueva' -- nueva | contactada | cotizada | ganada | perdida
);

CREATE INDEX IF NOT EXISTS idx_solicitudes_creado ON solicitudes (creado_en DESC);
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes (estado);
