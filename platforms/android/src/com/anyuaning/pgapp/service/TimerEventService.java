package com.anyuaning.pgapp.service;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

public class TimerEventService extends Service {

    @Override
    public void onCreate() {
        Log.i("thom", "timer event service on create");
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i("thom", "timer event service on start command");

        boolean isObtainGps = false;
        if (null != intent) {
            isObtainGps = intent.getBooleanExtra("test", false);
        }

        if (isObtainGps) {
            Log.i("thom", "test action obtain gps");
        }

        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

}
