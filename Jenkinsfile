pipeline {
    agent any
    
    environment {
        // Local simulation configurations - no AWS required for this test phase!
        FRONTEND_REPO  = 'my-frontend'
        BACKEND_REPO   = 'my-backend'
        IMAGE_TAG      = "${BUILD_NUMBER}"
        
        FRONTEND_URI   = "local/${FRONTEND_REPO}:${IMAGE_TAG}"
        BACKEND_URI    = "local/${BACKEND_REPO}:${IMAGE_TAG}"
        
        // Tells Jenkins which pre-configured global scanner tool to run
        SONAR_SCANNER  = 'SonarQubeScanner'
        }
     
    stages{
     stage('Checkout code base')
       {
          steps
            {
             git branch: 'main', url: 'https://github.com/pranjalpagaria/fullstack-eks-pipeline.git'
            }
       }

    }




}
