CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);


insert into blogs (author, url,title) values ('Dan Abramov' ,'http://www.heroku.com/vou','On let vs const');
insert into blogs (author, url,title) values ('Hugh Moore' ,'http://www.hughmoore.com/','Gaps in sequences in PostgreSQL');

SELECT * FROM blogs;



