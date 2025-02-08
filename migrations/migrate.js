// Adicionar ao final do arquivo existente
await db.exec(`
  CREATE TABLE IF NOT EXISTS failover_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    server_name TEXT NOT NULL,
    status TEXT NOT NULL,
    action TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS disaster_recovery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recovery_point DATETIME NOT NULL,
    status TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
