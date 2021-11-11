CREATE TABLE store (
    id BIGSERIAL PRIMARY KEY,
    storename VARCHAR,
    ownername VARCHAR
);
CREATE INDEX ON store (storename);



CREATE TABLE tsc (
    id BIGSERIAL PRIMARY KEY,
    typeop INT,
    tscvalue NUMERIC(10,2),
    cpf VARCHAR,
    cardnumber VARCHAR,
    store_id BIGINT references store(id),
    occurred_at TIMESTAMPTZ
);
CREATE INDEX ON tsc (typeop);
CREATE INDEX ON tsc (cardnumber);
CREATE INDEX ON tsc (store_id);