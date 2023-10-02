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
## User Module

create user
```
POST /api/users/signup
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/75c49609-b1ca-4aa7-9c9f-a895817a6d81)


get users list
```
GET /api/users
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/ac34c518-61aa-475d-83b9-d166c7e8cefe)


update users
```
PUT /api/users/:d/update
```
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/7a091df7-fc2e-4177-9dcc-ace7c188d175)

User with role 'USER' is unauthorized update the other user
![image](https://github.com/farizardin/insignia-backend-test-workspace/assets/20537870/8bf7dd5f-68fe-4806-8102-85ef0da8f9bd)

user archiving (Only for Admin)
```
DEL /api/users/:d/archive
```

get archived users list (Only for Admin)
```
GET /api/users/archived
```

restore user (Only for Admin)
```
PUT /api/users/:id/restore
```

user hard delete (Only for Admin)
```
DEL /api/users/:d/archive
```
