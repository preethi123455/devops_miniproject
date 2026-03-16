# DevOps Microproject: Branch-Based Deployment

## Overview

This project implements a branching strategy for deploying a micro-frontend (E-commerce portal) using Jenkins and Docker. The application is built using a simple set of HTML files served through an Nginx Docker container.

## Architecture & Branches

- **`main` Branch (Production)**: Commits merged to this branch simulate a production release. The Jenkins pipeline builds the Docker image and deploys it on **Port 80**.
- **`dev` Branch (Development)**: Commits to this branch simulate pushing to the development/testing environment. The Jenkins pipeline builds the Docker image and deploys it on **Port 8080**.

## Deliverables
1. **Source Code**: 3 Web pages (`index.html`, `products.html`, `contact.html`) located in the `src/` directory.
2. **Dockerfile**: Uses `nginx:alpine` to serve static pages.
3. **Jenkinsfile**: Defines a Declarative Pipeline with stage conditions based on branch name.
4. **Deployment Documentation**: This document.

## How It Works

### 1. Dockerfile
The Dockerfile is straightforward. It pulls `nginx:alpine` and copies the `src/` contents into `/usr/share/nginx/html/`.

### 2. Jenkinsfile Pipeline Stages
- **Checkout**: Pulls the latest code from the current branch.
- **Build Docker Image**: Builds an image `microshop-app:<BUILD_NUMBER>`.
- **Deploy to DEV**:
  - Automatically triggers when the branch is `dev`.
  - Removes the old `microshop-dev` container.
  - Runs the newly built image on port `8080`.
- **Deploy to Production**:
  - Automatically triggers when the branch is `main`.
  - Removes the old `microshop-prod` container.
  - Runs the newly built image on port `80`.

## Setup Instructions

### Pre-requisites
1. A server with **Docker** installed and running.
2. **Jenkins** installed, either directly on the server or as a Docker container (with access to the host Docker daemon).
3. Jenkins plugins required:
   - Pipeline
   - Git
   - Docker Pipeline

### Jenkins Configuration
1. Open Jenkins and create a new **Multibranch Pipeline**.
2. Point the **Branch Sources** (Git) to this repository URL.
3. Jenkins will automatically scan the repository, discover the `Jenkinsfile` in branches (`main` and `dev`), and trigger pipelines for each accordingly.

### Testing the Pipeline
1. **Push to `dev` Branch**:
   - Make a change on the `dev` branch.
   - Push to Git. Jenkins triggers the build.
   - Access the site at `http://<server-ip>:8080`.
2. **Push to `main` Branch**:
   - Make a change or merge `dev` to `main`.
   - Push to Git. Jenkins triggers the build.
   - Access the site at `http://<server-ip>:80`.
