basePath = '../..';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    'src/**/*.js',
    'test/unit/**/*.spec.js'
];

reporters = ['progress', 'growl'];

port = 8089;

runnterPort = 9109;

urlRoot = '/__test/';

colors = true;

logLevel = LOG_INFO;

autoWatch = false;

autoWatchInterval = 0;

browsers = ['Chrome'];

singleRun = true;