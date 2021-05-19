## Usage

`cordova-res` expects a Cordova project structure such as:

```
resources/
├── icon.png
└── splash.png
```

- `resources/icon.(png|jpg)` must be at least 1024×1024px
- `resources/splash.(png|jpg)` must be at least 2732×2732px

the actual script is located in `donor/scripts/generateMobileImages.ts`

## More can be found here

- https://github.com/ionic-team/cordova-res
- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/
