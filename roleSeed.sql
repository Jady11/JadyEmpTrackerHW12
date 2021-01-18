INSERT INTO department (name)
VALUES  ("Management"),
        ("Kitchen Staff"),
        ("Serving Staff"),
        ("Security Staff");
        
INSERT INTO role_id (title, salary, department_id)
VALUES   ("General Manager", 100000, 1),
        ("Assistant Manager", 65000, 1),
        ("Executive Chef", 85000, 2),
        ("Sous Chef", 55000, 2),
        ("Beverage Manager", 48000, 3),
        ("Assistant Manager", 55000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Rob", "Edington", 1, null),
        ("Megan", "Brown", 2, 1),
        ("Chuck", "Reed", 2, null),
        ("Marley", "Bramble", 3, 2),
        ("Kaitlin", "McClellan", 3, 1),
        ("Dan", "Irish", 4, 1),
        ("Sonia", "Phillips", 2, 2),
        ("Jorge", "Gonzales", 2, 2);


        