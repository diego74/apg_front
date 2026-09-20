alter table public.teams
  add column if not exists played integer not null default 0 check (played >= 0),
  add column if not exists won integer not null default 0 check (won >= 0),
  add column if not exists drawn integer not null default 0 check (drawn >= 0),
  add column if not exists lost integer not null default 0 check (lost >= 0),
  add column if not exists walkovers integer not null default 0 check (walkovers >= 0),
  add column if not exists points_for integer not null default 0 check (points_for >= 0),
  add column if not exists points_against integer not null default 0 check (points_against >= 0),
  add column if not exists difference integer not null default 0;

insert into public.teams (name, played, won, drawn, lost, walkovers, points_for, points_against, difference, points, active)
values
  ('LA CAPITANA A', 11, 8, 1, 2, 0, 141, 93, 48, 25, true),
  ('SHUREY KAIZEN', 11, 7, 1, 3, 0, 136, 102, 34, 22, true),
  ('NIKKYO F', 11, 7, 1, 3, 0, 136, 113, 23, 22, true),
  ('AELU 16', 11, 6, 1, 4, 0, 122, 121, 1, 19, true),
  ('OKINAWA D', 11, 6, 1, 4, 0, 119, 120, -1, 19, true),
  ('SAN AGUSTIN C', 11, 6, 0, 6, 0, 124, 114, 10, 18, true),
  ('AELU 23', 11, 5, 0, 6, 0, 116, 117, -1, 15, true),
  ('LA CAPITANA B', 11, 5, 0, 6, 0, 115, 126, -11, 15, true),
  ('ODAWARA', 11, 4, 0, 7, 0, 113, 137, -24, 12, true),
  ('ANC', 11, 4, 0, 7, 0, 101, 131, -30, 12, true),
  ('AELU 26', 11, 3, 0, 8, 0, 101, 141, -40, 9, true),
  ('LA CAPITANA D', 11, 2, 1, 8, 0, 109, 118, -9, 7, true)
on conflict (name) do update set
  played = excluded.played, won = excluded.won, drawn = excluded.drawn,
  lost = excluded.lost, walkovers = excluded.walkovers,
  points_for = excluded.points_for, points_against = excluded.points_against,
  difference = excluded.difference, points = excluded.points, active = true;
