# Cartify Project Run Guide & Report Steps

This document provides step-by-step instructions on how to run the Cartify project.

## Method 1: Running Locally (Fastest Way to See Output)

To quickly run and test the frontend application on your local Windows machine using Docker:

### Step 1: Open Terminal
Open your terminal (PowerShell or Command Prompt) and navigate to the project directory:
```bash
cd C:\Users\preet\Downloads\devops-microproject
```

### Step 2: Build the Docker Image
```bash
docker build -t cartify-app:local .
```

### Step 3: Run the Docker Container
```bash
docker run -d -p 8080:80 --name my-cartify cartify-app:local
```

### Step 4: View Your Output
Open your web browser and navigate to: [http://localhost:8080](http://localhost:8080)

---

## Method 2: Running via Jenkins Pipeline (The DevOps Way)

### Step 1: Push Code to a Git Repository
```bash
git add .
git commit -m "Final Cartify branding overhaul"
git push origin dev
```

### Step 2: View Pipeline Output
- **For `dev` branch**: It deploys to Port **8081**. Access it at `http://localhost:8081`.
- **For `main` branch**: It deploys to Port **80**. Access it at `http://localhost:80`.

---

## Tips for Making Your Project Report

1. **Source Code**: Snippets of your `Dockerfile` and `Jenkinsfile`.
2. **Build Process**: A screenshot of your terminal showing a successful `docker build`.
3. **Running Container**: Run `docker ps` in terminal and screenshot the active container.
4. **Webpage Output**: A screenshot of your browser showing the live website running on `localhost:80`.
5. **Jenkins UI**: Include a screenshot of the successful Jenkins Pipeline stages.
6. **Monitoring**: Include a screenshot of your Grafana dashboard showing `cartify_up` metrics.
