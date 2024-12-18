--liquibase formatted sql
--changeset Daniil Yatsiny:1
CREATE TABLE _user
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_name varchar(50) NOT NULL UNIQUE,
    password varchar(256) NOT NULL UNIQUE,
    CONSTRAINT user_id_pk PRIMARY KEY (id)
);

--rollback drop table _user;