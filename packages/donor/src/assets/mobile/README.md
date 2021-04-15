## Usage

`cordova-res` expects a Cordova project structure such as:

```
resources/
├── icon.png
└── splash.png
config.xml
```

* `resources/icon.(png|jpg)` must be at least 1024×1024px
* `resources/splash.(png|jpg)` must be at least 2732×2732px
* `config.xml` is optional. If present, the generated images are registered accordingly

## Adaptive Icons
Android Adaptive Icons are also supported. If you choose to use them, create the following additional file(s):

- ```resources/android/icon-foreground.png``` must be at least 432×432px
- ```resources/android/icon-background.png``` must be at least 432×432px
- A color may also be used for the icon background by specifying the ```--icon-background-source``` option with a hex color code, e.g. ```--icon-background-source '#FFFFFF'```.


## More can be found here
- https://github.com/ionic-team/cordova-res
- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/
