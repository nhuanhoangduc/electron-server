const { app, BrowserWindow } = require('electron');

// Start backend
require('./backend/server');

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname);
    require('electron-debug')();
}

(async () => {
    await app.whenReady();

    const MainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    MainWindow.loadFile('./frontend/dist/MainWindow.html');
    MainWindow.show();
})();
