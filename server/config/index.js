module.exports = {
  routes: [
    {
      base_route_name: 'smsc',
      route_dir_path: 'smsc/routes'
    }
  ],
  associations: [
    {
      association_dir_path: 'smsc/association'
    }
  ],
  swaggerPaths: ['model/index.js', 'model/phone.js', 'routes/index.js']
};
