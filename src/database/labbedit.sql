-- Active: 1704838791198@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    apelido TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
)

INSERT INTO users (id, apelido, email, senha)
VALUES
    ('u001','Fulano','fulano@email.com','fulano123'),
    ('u002','Ciclana','ciclana@email.com','ciclana123'),
    ('u003','Beltrano','beltrano@email.com','beltrano123');

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    conteúdo TEXT NOT NULL,
    downvote INTEGER DEFAULT (0) NOT NULL,
    upvote INTEGER DEFAULT (0) NOT NULL,
    comments INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

INSERT INTO posts(id, creator_id, conteúdo)
VALUES
    ('p001','u001','Olá, meu nome é Fulano'),
    ('p002','u002','Olá, meu nome é não é Beltrana'),
    ('p003','u003','Olá, essa gente é estranha');



CREATE TABLE comments(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    post_id TEXT NOT NULL,
    commenter_id TEXT NOT NULL,
    conteúdo TEXT NOT NULL,
    downvote INTEGER DEFAULT (0) NOT NULL,
    upvote INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (commenter_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

INSERT INTO comments (id, post_id, commenter_id, conteúdo)
VALUES
    ('c001','p001','u002','Olá, Fulano, me chamo Ciclana!'),
    ('c002','p002','u001','Olá, Ciclana, me chamo Fulano'),
    ('c003','p003','u001','Cara, você é o único que não segue o padrão!');


CREATE TABLE upvote_downvote_post (
    voter_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    direction INTEGER NOT NULL,
    FOREIGN KEY (voter_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
     FOREIGN KEY (post_id) REFERENCES posts (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE upvote_downvote_comment (
    voter_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    upvote INTEGER NOT NULL,
    downvote INTEGER NOT NULL,
    FOREIGN KEY (voter_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
     FOREIGN KEY (comment_id) REFERENCES comments (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


INSERT INTO upvote_downvote_post (voter_id, post_id, direction)
VALUES
    ('u001','p002', 1),
    ('u002','p001', 1),
    ('u003','p002', 0);

UPDATE posts
SET upvote = 1
WHERE id = 'p001'

UPDATE posts
SET upvote = 1, downvote = 1
WHERE id = 'p002'