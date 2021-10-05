export function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
        return "android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return "ios";
    }
    return "unknown";
}