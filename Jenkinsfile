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
    stage('Paralle Pre Build Scans')
    {
     
     parallel
      {

      stage('Sonar Static Analysis')
      {
        steps
              {
                        withSonarQubeEnv('SonarQube-Server') { 
                            // Executes the automated static analysis across the repository
                            sh "${tool env.SONAR_SCANNER}/bin/sonar-scanner \
                                -Dsonar.projectKey=nodejs-fullstack-app \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=**/node_modules/**,**/build/**,**/dist/**"
                                 }
                                 } 

     
                                 } 

     stage('Trivy FileSystem Verification')
       {
                steps{

                            // Directly leverages the continuous Trivy container service over the Docker network
                        sh "docker run --rm --network devops-network aquasec/trivy:latest fs --server http://trivy-scanner:4954 --exit-code 0 /apps"
                     }


}
     
    }






}

}
