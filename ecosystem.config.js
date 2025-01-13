module.exports = {
  apps: [
    {
      name: 'design-simplified-be',               
      script: 'node dist/index.js',        
      instances: '1',          
      env: {
        NODE_ENV: 'development', 
      },
      env_production: {
        NODE_ENV: 'production',  
      }
    }
  ]
};