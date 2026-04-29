# Terraform configuration to manage our local Docker environment

terraform {
  required_providers {
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2.1"
    }
  }
}

resource "null_resource" "cartify_deployment" {
  # 1. Build the Docker Image
  provisioner "local-exec" {
    command = "docker build -t cartify-app:latest .."
  }

  # 2. Cleanup existing containers
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

  triggers = {
    build_number = "${timestamp()}"
  }
}
