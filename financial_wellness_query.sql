CREATE TABLE TwoThousand(
  group VARCHAR(30) NOT NULL,
  category VARCHAR(30),
  certain_I_could DECIMAL,
  probably_could DECIMAL,
  I_dont_know DECIMAL,
  probably_not DECIMAL,
  ceratain_I_could_not DECIMAL,
);

CREATE TABLE Housing(
  group VARCHAR(30) NOT NULL,
  category VARCHAR(30),
  never_ DECIMAL,
  sometime DECIMAL,
  often DECIMAL,
);

CREATE TABLE MoneyLeft(
  group VARCHAR(30) NOT NULL,
  category VARCHAR(30),
  always_ DECIMAL,
  often DECIMAL,
  sometimes DECIMAL,
  rarely DECIMAL,
  never_ DECIMAL,
);

CREATE TABLE PayDay(
  group VARCHAR(30) NOT NULL,
  category VARCHAR(30),
  no DECIMAL,
  yes DECIMAL,
);

CREATE TABLE Rejected_credit(
  group VARCHAR(30) NOT NULL,
  category VARCHAR(30),
  no DECIMAL,
  yes DECIMAL,
);

