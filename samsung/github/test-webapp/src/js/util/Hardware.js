navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

export default class Hardware{

    static vibrate(time){
        time = time || 50;
        if (navigator.vibrate) navigator.vibrate(time);
    }

}