import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    //.developmentLogging()
    .plugin('aurelia-validation')
    .plugin('aurelia-computed');

  //aurelia.use.plugin('aurelia-ui-virtualization');

  //Uncomment the line below to enable animation.
  aurelia.use.plugin('aurelia-animator-css');

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(a => a.setRoot());
}
