# Project Run Guide & Report Steps

This document provides step-by-step instructions on how to run the Microshop project so you can easily view the output and generate a report.

## Method 1: Running Locally (Fastest Way to See Output)
To quickly run and test the frontend application on your local Windows machine using Docker:

### Step 1: Open Terminal
Open your terminal (PowerShell or Command Prompt) and navigate to the project directory:
```bash
cd C:\Users\preet\Downloads\devops-microproject
```

### Step 2: Build the Docker Image
Run the following command to create the Docker image using the provided `Dockerfile`:
```bash
docker build -t microshop-app:local .
```

### Step 3: Run the Docker Container
Start a container from the image. We will map it to port 8080 (simulating the DEV environment):
```bash
docker run -d -p 8080:80 --name my-microshop microshop-app:local
```

### Step 4: View Your Output
Open your web browser and navigate to:
[http://localhost:8080](http://localhost:8080)
You will see the main webpage. (You can also check out `products.html` or `contact.html` based on your `src` folder structure).

### Step 5: Stop the Application
When you are done testing and taking screenshots, clean up by deleting the container:
```bash
docker rm -f my-microshop
```

---

## Method 2: Running via Jenkins Pipeline (The DevOps Way)
If your report needs to demonstrate the CI/CD functionality using the provided `Jenkinsfile`:

### Step 1: Push Code to a Git Repository
Ensure this project is pushed to a remote repository (like GitHub, GitLab, or Bitbucket) because Jenkins needs to fetch it.
```bash
git init
git add .
git commit -m "microproject initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
*(Optionally create and push the `dev` branch: `git checkout -b dev` and `git push -u origin dev`)*

### Step 2: Set up Jenkins
1. Open your Jenkins Dashboard.
2. Click **New Item**, name it something like `microshop-pipeline`, choose **Multibranch Pipeline**, and click OK.
3. Under **Branch Sources**, add your Git repository.
4. Save it. Jenkins will automatically scan your repo and find the `Jenkinsfile`.

### Step 3: View Pipeline Output
1. The pipeline will automatically run based on your branches.
2. **For `dev` branch**: It deploys to Port **8080**. Access it at `http://<your-server-ip>:8080`.
3. **For `main` branch**: It deploys to Port **80**. Access it at `http://<your-server-ip>:80`.

---

## Tips for Making Your Project Report
To make a great project report, make sure to include the following screenshots:
1. **Source Code**: Snippets of your `Dockerfile` and `Jenkinsfile`.
2. **Build Process**: A screenshot of your terminal showing a successful `docker build`.
3. **Running Container**: Run `docker ps` in terminal and screenshot the active container.
4. **Webpage Output**: A screenshot of your browser showing the live website running on `localhost:8080` or `localhost:80`.
5. **Jenkins UI (Optional)**: If you use Method 2, include a screenshot of the successful Jenkins Pipeline stages (Checkout > Build > Deploy).
