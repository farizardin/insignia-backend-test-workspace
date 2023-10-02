# InsigniaBackendTestWorkspace
## Create DB
create db with name `contact_group`

## Running tasks
```
npm install
```

run migration
```
prisma migrate db
prisma db push
```

run data base seed to generate admin
```
npx prisma db seed
```
# Modules
## Auth Module
login with created user
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/bfd34430-c34f-4105-9cee-2b29c14a4061)

## User Module

create user
```
POST /api/users/signup
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/98fbb3ca-296b-454e-aaac-36b91ea344ad)

get users list
```
GET /api/users
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/640d1a5f-dcd7-4c73-9475-24ac230f5bb5)


update users
```
PUT /api/users/:d/update
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/7e7ae2c9-7bbe-4b2d-b174-f452291c6ffc)


User with role 'USER' is unauthorized update the other user
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/e0c2df83-175e-4e59-af61-b9d3b584832f)


user archiving (Only for Admin)
```
DEL /api/users/:d/archive
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/2da3916a-dd49-44c9-9582-67b161d5c27a)


get archived users list (Only for Admin)
```
GET /api/users/archived
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/0aebaa8f-8bc7-431f-8726-f2d47bb226c4)


restore user (Only for Admin)
```
PUT /api/users/:id/restore
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/18429001-cd42-4946-b73a-f4dcc0aedf6e)


user hard delete (Only for Admin)
```
DEL /api/users/:d/hard_delete
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/4ba82eaf-d041-4ee3-a9ac-d27e7ca343c0)

## Contact Module

create contact
```
POST /api/contact/signup
```

get contact list
```
GET /api/contact
```


update contact
```
PUT /api/contact/:d/update
```


contact archiving
```
DEL /api/contact/:d/archive
```

get archived contact list
```
GET /api/contact/archived
```

restore contact
```
PUT /api/contact/:id/restore
```

contact hard delete
```
DEL /api/contact/:d/hard_delete
```
