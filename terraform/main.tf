# Terraform configuration to manage our local Docker environment
# We use local-exec as a "bulletproof" wrapper to avoid Docker API version mismatch errors 
# that can happen with the native Terraform Docker provider on very new Docker versions.

terraform {
  required_providers {
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2.1"
    }
  }
}

resource "null_resource" "microshop_deployment" {
  # 1. Build the Docker Image
  provisioner "local-exec" {
    command = "docker build -t cartify-app:latest .."
  }

  # 2. Cleanup existing containers (to prevent name conflicts)
  provisioner "local-exec" {
    command = "docker rm -f cartify-prod cartify-dev || echo 'No existing containers to remove'"
  }

  # 3. Run Production Container (Port 80)
  provisioner "local-exec" {
    command = "docker run -d -p 80:80 --name cartify-prod cartify-app:latest"
  }

  # 4. Run Development Container (Port 8081)
  provisioner "local-exec" {
    command = "docker run -d -p 8081:80 --name cartify-dev cartify-app:latest"
  }

  # This makes it easy to run again if you change code
  triggers = {
    build_number = "${timestamp()}"
  }
}
