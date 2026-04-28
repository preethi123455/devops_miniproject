pipeline {
    agent any

    environment {
        IMAGE_NAME = "microshop-app"
    }

    stages {
        stage('Cleanup') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker Image: ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
                }
            }
        }
        
        stage('Deploy to DEV') {
            when {
                branch 'dev'
            }
            steps {
                script {
                    echo "Deploying to DEV Environment..."
                    sh 'docker rm -f microshop-dev || true'
                    sh "docker run -d -p 8081:80 --name microshop-dev ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "Deploying to Production Environment..."
                    sh 'docker rm -f microshop-prod || true'
                    sh "docker run -d -p 80:80 --name microshop-prod ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline execution complete base on branch ${env.BRANCH_NAME}."
        }
        success {
            echo "Deployment to ${env.BRANCH_NAME} was successful!"
        }
        failure {
            echo "Deployment failed."
        }
    }
}
