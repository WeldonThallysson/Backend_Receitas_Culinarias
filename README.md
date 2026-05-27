## docker exec -i receitas_mysql mysql -uroot -proot < database/script.sql

entre no 

docker exec -it receitas_mysql mysql -u root -proot

GRANT ALL PRIVILEGES ON *.* TO 'receitas_user'@'%';

FLUSH PRIVILEGES;
