# Mutoon — EC2 Deployment Guide

## Requirements
- Ubuntu 22.04 LTS (or similar)
- Node.js 20+
- PostgreSQL 14+
- PM2 (process manager)

---

## 1. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 2. Install PM2

```bash
sudo npm install -g pm2
```

## 3. Set Up PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql -c "CREATE USER mutoon WITH PASSWORD 'yourpassword';"
sudo -u postgres psql -c "CREATE DATABASE mutoon OWNER mutoon;"
```

## 4. Upload & Extract the App

Upload `mutoon-deploy.zip` to your EC2 instance and extract it:

```bash
unzip mutoon-deploy.zip -d mutoon
cd mutoon
```

## 5. Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Fill in your values:
```
DATABASE_URL=postgresql://mutoon:yourpassword@localhost:5432/mutoon
SESSION_SECRET=pick-a-long-random-string-here
NODE_ENV=production
PORT=5000
```

## 6. Install Dependencies

```bash
npm install --omit=dev
```

## 7. Set Up the Database

Run the database migrations to create the tables:

```bash
npx drizzle-kit push
```

## 8. Start the App with PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

The app will now run on port **5000** and restart automatically if it crashes or the server reboots.

## 9. (Optional) Open Port / Set Up Nginx

If you want to serve on port 80/443, either:

**Option A — Open port 5000 in your EC2 Security Group** (simplest)

**Option B — Use Nginx as a reverse proxy:**

```bash
sudo apt install -y nginx
```

Create `/etc/nginx/sites-available/mutoon`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/mutoon /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Useful PM2 Commands

| Command | Description |
|---|---|
| `pm2 status` | Check if the app is running |
| `pm2 logs mutoon` | View live logs |
| `pm2 restart mutoon` | Restart the app |
| `pm2 stop mutoon` | Stop the app |
