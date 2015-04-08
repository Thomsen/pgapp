package com.anyuaning.pgapp.plugin;

import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.Context;
import android.os.SystemClock;


public class AlarmTimerPlugin extends CordovaPlugin {

    private static final String ONCE_TIMER_ACTION = "onceTimer";

    private static final String LOOP_TIMER_ACTION = "loopTimer";

    private Context mContext;

    private AlarmManager alarmManager;

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        Log.i("thom", "alarm timer plugin cordovaargs");
        if (ONCE_TIMER_ACTION.equals(action)) {

        }
        return super.execute(action, args, callbackContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        mContext = this.cordova.getActivity();
        alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
        Log.i("thom", "alarm timer plugin jsonarray");
        if (ONCE_TIMER_ACTION.equals(action)) {
            Log.i("thom", "pgappTimer onceTimer jsonarray");

            registerOnceAlarm(3000, callbackContext);

            PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
            plugResult.setKeepCallback(true);
            callbackContext.sendPluginResult(plugResult);

            return true;
        }

        if (LOOP_TIMER_ACTION.equals(action)) {
            Log.i("thom", "pgappTimer loopTimer jsonarray");

            registerLoopAlarm(5000, callbackContext);

            return true;
        }

        // invalid action

        return super.execute(action, args, callbackContext);
    }

    public void registerOnceAlarm(int interval, CallbackContext callbackContext) {
        registerTaskReceiver(callbackContext, ONCE_TIMER_ACTION);
        Intent intent = new Intent();
        intent.setAction(ONCE_TIMER_ACTION);
        PendingIntent onceIntent = PendingIntent.getBroadcast(mContext, 0, intent, PendingIntent.FLAG_ONE_SHOT);
        if (null != alarmManager) {
            alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime() + interval, onceIntent);
        }
    }

    public void registerLoopAlarm(int interval, CallbackContext callbackContext) {
        registerTaskReceiver(callbackContext, LOOP_TIMER_ACTION);
        Intent intent = new Intent();
        intent.setAction(LOOP_TIMER_ACTION);
        PendingIntent loopIntent = PendingIntent.getBroadcast(mContext, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
        if (null != alarmManager) {
            alarmManager.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime(), interval, loopIntent);
        }
    }

    private void registerTaskReceiver(final CallbackContext callbackContext, final String action) {
        BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Log.d("thom", "task receiver " + action + " exec");

                // PluginResult plugResultLoop = new PluginResult(PluginResult.Status.NO_RESULT);
                PluginResult plugResultLoop = new PluginResult(PluginResult.Status.OK);
                plugResultLoop.setKeepCallback(true);
                callbackContext.sendPluginResult(plugResultLoop);

                // callbackContext.success("timer work action"); // sendPluginResult(new PluginResult(PluginResult.Status.OK, message));
            }
         };
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(action);
        mContext.getApplicationContext().registerReceiver(receiver, intentFilter);
    }
}