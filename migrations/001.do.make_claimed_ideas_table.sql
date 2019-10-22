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

INSERT INTO ideas
  (id, ideaName, ideaSummary, authorName, email, claimed, submitted)
  VALUES 
  (
    1, 
    'build an ecommerce website', 
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
    'Name 1',
    'name1@email.com',
    1,
    0,
  );

  (
    2,
    'develop a singles matching app',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
    'Name 2',
    'name2@email.com',
    0,
    0,

  );
  (
    3, 
    'come up with an algorithm to calculate something',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium', 
    'Name 3',
    'name3@email.com',
    1,
    0
         
  ),
  (
    4, 
    'build a database of stuff',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium', 
    'Name 4',
    'name4@email.com',
    0,
    0
  );

  (
    5,
    'collaborate on a join project',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
    'Name 5',
    'name5@email.com',
    1,
    0,
    ),

  (
    6,
    'put my portfolio on line',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium'  
    'Name 6',
    'name6@email.com',
    0,
    0,
  ),

  (
    7,
    'set up a gofundme account',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium', 
    'Name 7',
    'name7@email.com',
    1,
    0,
  ),

  (
    8,
    'create a chess game',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
    'Name 8', 
    'name8@email.com',
    0,
    0,
  ),

  (
    9,
    'add AI to my current app',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
    'Name 9',
    'name9@email.com',
  
    1,
    0
  ),
  (
    10, 
    'build a front end for my server',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
    'Name 10',
    'name10@email.com',
    
    
  ),