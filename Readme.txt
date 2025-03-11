# Cara Menjalankan PosCare

## Setup environment

install git, node, mongodb, dan vs code dengan menjalankan file installer di folder Program Pendukung

### install npm 10.9.0 dengan CMD

```bash
npm install npm@10.9.0
```


## Buka program dari VS Code

- buka VS code
- open directory PosCare


## Jalankan Server DataBase MongoDB

### jalankan command
```bash
mongod --dbpath="c:\data\db"
```

## Jalankan Server Backend

### buka terminal git bash atau CMD
### masuk ke folder backend
```bash
cd backend
```
### install dependencies
```bash
npm install
```
### buat env file
- .development.env
- .production.env

### Jalankan command
```bash
npm run dev
```


## Jalankan Server Frontend

### buka terminal git bash atau CMD
### masuk ke folder frontend
```bash
cd frontend
```
### install dependencies
```bash
npm install
```
### buat env file
- .env.development
- .env.production
- .env.staging

### Jalankan command
```bash
npm run dev
```