# Master Guide: DevOps Project (Local Setup)

Welcome to your DevOps project! This guide will help you run a complete branch-based deployment using **Jenkins, Docker, Terraform, Prometheus, and Grafana** directly on your Windows PC.

---

## 1. Prerequisites (Install these first)

As a beginner, make sure you have these tools installed on your Windows machine:
1. **Docker Desktop**: [Download here](https://www.docker.com/products/docker-desktop/) (Used to run containers).
2. **Terraform**: [Download here](https://developer.hashicorp.com/terraform/downloads) (Used for Infrastructure as Code).
3. **Jenkins**: [Install via Docker](https://www.jenkins.io/doc/book/installing/docker/) or as a Windows application.
4. **Git**: [Download here](https://git-scm.com/downloads).

---

## 2. Infrastructure as Code (Terraform)

Terraform allows you to "code" your infrastructure. We use it to create our app containers.

1. Open PowerShell and go to the project folder.
2. Navigate to the terraform folder:
   ```bash
   cd terraform
   ```
3. Initialize Terraform:
   ```bash
   terraform init
   ```
4. Run Terraform to create your containers:
   ```bash
   terraform apply -auto-approve
   ```
5. **Result**: Your app is now running on:
   - Production: [http://localhost:80](http://localhost:80)
   - Development: [http://localhost:8081](http://localhost:8081)

---

## 3. CI/CD Pipeline (Jenkins)

Jenkins automates your deployment when you change code.

1. Open Jenkins in your browser (usually `http://localhost:8080`).
2. Create a **New Item** -> **Multibranch Pipeline**.
3. Name it `devops-microproject`.
4. In **Branch Sources**, add your local Git repository path or GitHub URL.
5. Click **Save**. Jenkins will scan your branches (`main` and `dev`) and run the `Jenkinsfile`.
6. **Note**: The Jenkinsfile is already configured to build and deploy based on the branch name.

---

## 4. Monitoring (Prometheus & Grafana)

Monitoring helps you see if your app is healthy.

1. Navigate to the monitoring folder:
   ```bash
   cd monitoring
   ```
2. Start Prometheus and Grafana:
   ```bash
   docker-compose up -d
   ```
3. Access **Grafana**: [http://localhost:3000](http://localhost:3000)
   - **User**: `admin`
   - **Password**: `admin`
4. Access **Prometheus**: [http://localhost:9090](http://localhost:9090)

---

## 5. Summary Table (Ports & Credentials)

| Tool | URL | Credentials |
| :--- | :--- | :--- |
| **App (Prod)** | http://localhost:80 | N/A |
| **App (Dev)** | http://localhost:8081 | N/A |
| **Jenkins** | http://localhost:8080 | Your Jenkins Login |
| **Grafana** | http://localhost:3000 | `admin` / `admin` |
| **Prometheus** | http://localhost:9090 | N/A |

---

## 7. Troubleshooting

### "Client version is too old" Error
I have updated the project to use a **"Bulletproof Build"** method. Instead of letting Terraform handle the image build (which causes version errors), Terraform now calls your computer's built-in `docker build` command directly. This fixes the API error automatically!

Just run:
```powershell
terraform apply -auto-approve
```

---

## 8. How to Present This Project

To impress your audience, show these steps in order:
1. Show the **GitHub Branches** (`main` and `dev`).
2. Show **Terraform** creating the infrastructure.
3. Show **Jenkins** automatically building the app after a code push.
4. Show the **Live Website** running on different ports.
5. Show the **Grafana Dashboard** visualizing the status.
