# Project Master Report: Automated Branch-Based DevOps Lifecycle

## 1. Project Title & Overview
**Title:** End-to-End Automated CI/CD Pipeline with Branch-Based Deployment & Real-Time Monitoring.
**Objective:** To design and implement a zero-manual-intervention DevOps lifecycle that handles development, production deployment, and infrastructure observability.

---

## 2. Technical Stack (The "Powerhouse")
*   **Version Control:** GitHub (Git)
*   **CI/CD Engine:** Jenkins (Automated via Groovy DSL - `Jenkinsfile`)
*   **Infrastructure as Code (IaC):** Terraform (HCL)
*   **Containerization:** Docker (Dockerfile & Docker Compose)
*   **Monitoring & Observability:** Prometheus (Data Collection) & Grafana (Visualization)
*   **Server/Hosting:** LocalHost with Docker-in-Docker (DinD) configuration

---

## 3. The Professional Workflow (Step-by-Step)

### **Phase 1: Code Commitment (GitHub)**
*   Developers work on the `dev` branch.
*   Pushing code to GitHub triggers a webhook/polling event in Jenkins.

### **Phase 2: CI/CD Pipeline (Jenkins)**
*   **Workspace Cleanup:** Ensures no "ghost files" exist from previous builds.
*   **Checkout:** Jenkins pulls the latest code from the specific branch (`dev` or `main`).
*   **Docker Build:** Dynamically builds a new Docker Image with a unique tag.
*   **Deployment Logic:**
    *   If **Dev Branch**: Deploys the container to **Port 8081** (Staging).
    *   If **Main Branch**: Deploys the container to **Port 80** (Production).
*   **Automated Cleanup:** Replaces old containers with new ones to prevent resource leaks.

### **Phase 3: Production Merge (Git Strategy)**
*   Once testing on `dev` is successful, code is merged into `main` using the `-X theirs` strategy to prioritize the latest feature additions and resolve conflicts automatically.

### **Phase 4: Monitoring (Prometheus & Grafana)**
*   **Prometheus** scrapes the HTTP endpoints of the running containers to check for a "200 OK" status.
*   **Grafana** pulls metrics from the Prometheus database to display CPU load, Memory consumption, and uptime graphs.

---

## 4. Key Technical Features (The "Deep Detail")

### **1. Shared Socket Architecture**
We mounted the host's Docker socket (`/var/run/docker.sock`) into the Jenkins container. This allowed Jenkins (a container itself) to "spawn" other containers on the host machine. This is a high-level **Docker-in-Docker** pattern.

### **2. Branch-Aware Deployment**
The `Jenkinsfile` uses environment variables (`env.BRANCH_NAME`) to decide which port to use. This simulates a real-world environment where `dev` is for testing and `main` is for the customer.

### **3. Automatic Conflict Resolution**
We used `git merge -X theirs dev` in the terminal to handle "Merge Conflicts" without stopping the pipeline. This ensures a smooth automated flow from local development to cloud production.

---

## 5. Conclusion
This project demonstrates a production-ready DevOps architect's skill set:
1.  Handling code (Git).
2.  Building environments (Docker).
3.  Automating the flow (Jenkins).
4.  Watching the health (Grafana).

**Final Result:** A robust, self-healing, and fully observable software delivery lifecycle.
