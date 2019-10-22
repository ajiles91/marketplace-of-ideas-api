DROP TABLE IF EXISTS ideas;

CREATE TABLE ideas (
  id INTEGER PRIMARY KEY,
  ideaName TEXT NOT NULL,
  ideaSummary TEXT NOT NULL,
  authorName TEXT NOT NULL,
  email TEXT NOT NULL,
  claimed boolean not null default  1,
  submitted boolean not null default 0
);

