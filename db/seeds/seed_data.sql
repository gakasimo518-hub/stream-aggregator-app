BEGIN;

-- Insert an admin user
INSERT INTO users (
    id,
    email,
    password_hash,
    role,
    created_at,
    updated_at
) VALUES (
    1,
    'admin@example.com',
    '$2b$12$KIXx9Zy5a1Zx9Zy5a1Zx9Oe5a1Zx9Zy5a1Zx9Zy5a1Zx9Zy5a1Zx9',
    'admin',
    NOW(),
    NOW()
);

-- Insert sample streaming channels
INSERT INTO channels (
    id,
    name,
    url,
    description,
    status,
    created_at,
    updated_at
) VALUES
    (
        1,
        'Live Sports',
        'https://dlive.sx/sports',
        'Live sports channel with real-time commentary.',
        'active',
        NOW(),
        NOW()
    ),
    (
        2,
        'Movie Channel',
        'https://dlive.sx/movies',
        'A wide selection of movies and series across genres.',
        'active',
        NOW(),
        NOW()
    ),
    (
        3,
        'News 24',
        'https://dlive.sx/news',
        '24/7 news coverage from around the world.',
        'active',
        NOW(),
        NOW()
    );

COMMIT;