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
import javax.net.ssl.SSLEngineResult.Status;
import java.util.HashMap;
import java.util.Map;


public class AlarmTimerPlugin extends CordovaPlugin {

    private static final String ONCE_TIMER_ACTION = "onceTimer";

    private static final String LOOP_BROADCAST_TIMER_ACTION = "loopBroadcastTimer";

    private static final String LOOP_SERVICE_TIMER_ACTION = "loopServiceTimer";

    private static final String CANCEL_BROADCAST_TIMER_ACTION = "cancelBroadcastTimer";

    private static final String CANCEL_SERVICE_TIMER_ACTION = "cancelServiceTimer";

    private Context mContext;

    private CallbackContext mCallbackContext;

    private AlarmManager alarmManager;

    private Map<String, BroadcastReceiver> cachedReceiver;  // String content common, but object different

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
        mCallbackContext = callbackContext;
        alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
        cachedReceiver= new HashMap<String, BroadcastReceiver>();
        CordovaArgs coargs = new CordovaArgs(args);
        if (ONCE_TIMER_ACTION.equals(action)) {
            Log.i("thom", "pgappTimer onceTimer jsonarray");
            registerOnceAlarm(coargs, callbackContext);
            PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
            plugResult.setKeepCallback(true);
            callbackContext.sendPluginResult(plugResult);

            return true;
        }

        if (LOOP_BROADCAST_TIMER_ACTION.equals(action)) {
            Log.i("thom", "pgappTimer loopBroadcastTimer jsonarray");
            registerLoopBroadcastAlarm(coargs, callbackContext);
            return true;
        }

        if (LOOP_SERVICE_TIMER_ACTION.equals(action)) {
            Log.i("thom", "pgappTimer loopServiceTimer jsonarray");
            registerLoopServiceAlarm(coargs, callbackContext);
            return true;
        }

        if (CANCEL_BROADCAST_TIMER_ACTION.equals(action)) {
            Log.i("thom", "pgappTimer cancelBroadcastTimer jsonarray");
            cancelBroadcastAlarm(coargs, callbackContext);
            return true;
        }

        if (CANCEL_SERVICE_TIMER_ACTION.equals(action)) {
            Log.i("thom", "pgappTimer cancelServiceTimer jsonarray");
            cancelServiceAlarm(coargs, callbackContext);
            return true;
        }

        // invalid action

        return super.execute(action, args, callbackContext);
    }

    public void registerOnceAlarm(CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        registerTaskReceiver(callbackContext, ONCE_TIMER_ACTION);
        Intent intent = new Intent();
        intent.setAction(ONCE_TIMER_ACTION);
        PendingIntent onceIntent = PendingIntent.getBroadcast(mContext, 0, intent, PendingIntent.FLAG_ONE_SHOT);
        if (null != alarmManager) {
            int interval = args.getInt(0);
            alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime() + interval, onceIntent);
        }
    }

    public void registerLoopBroadcastAlarm(CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        int interval = args.getInt(0);
        String action = args.getString(2);
        registerTaskReceiver(callbackContext, action);
        Intent intent = new Intent();
        intent.setAction(action);
        PendingIntent loopIntent = PendingIntent.getBroadcast(mContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        if (null != alarmManager) {
            alarmManager.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime(), interval, loopIntent);
        }
    }

    private void registerTaskReceiver(final CallbackContext callbackContext, final String action) {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(action);
        mContext.getApplicationContext().registerReceiver(receiver, intentFilter);
    }

    BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                Log.d("thom", "task receiver " + action + " exec");

                // PluginResult plugResultLoop = new PluginResult(PluginResult.Status.NO_RESULT);
                PluginResult plugResultLoop = new PluginResult(PluginResult.Status.OK);
                plugResultLoop.setKeepCallback(true);
                mCallbackContext.sendPluginResult(plugResultLoop);

                // callbackContext.success("timer work action"); // sendPluginResult(new PluginResult(PluginResult.Status.OK, message));
            }
        };

    public void registerLoopServiceAlarm(CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        int interval = args.getInt(0);
        String serviceClassName = args.getString(1);
        String action = args.getString(2);
        Intent intent = new Intent();
        intent.setClassName(mContext, serviceClassName);
        intent.setAction(action);
        intent.putExtra(action, true);
        PendingIntent loopIntent = PendingIntent.getService(mContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        if (null != alarmManager) {
            alarmManager.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime(), interval, loopIntent);
            Log.i("thom", "loop service alarm serviceClassName: " + serviceClassName);
        }
        // how callback context
    }

    public void cancelBroadcastAlarm(CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        String action = args.getString(2);
        Intent intent = new Intent();
        intent.setAction(action);
        PendingIntent pi = PendingIntent.getBroadcast(mContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        if (null != alarmManager) {
            alarmManager.cancel(pi);
            unregisterBroadcast(action);
        }

    }

    public void cancelServiceAlarm(CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        String serviceClassName = args.getString(1);
        String action = args.getString(2);
        Intent intent = new Intent();
        intent.setClassName(mContext, serviceClassName);
        intent.setAction(action);
        intent.putExtra(action ,true);
        PendingIntent pi = PendingIntent.getService(mContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);  // UPDATE use already PendingIntent, intent must common
        if (null != alarmManager) {
            alarmManager.cancel(pi);
            Log.i("thom", "cancel service alarm: " + serviceClassName);
        } else {
            Log.i("thom", "cancel alarmmanager null");
        }
    }

    private void unregisterBroadcast(String action) {
        try {
            Log.i("thom", "unregister broadcast receiver: " + action);
             BroadcastReceiver receiver = cachedReceiver.get(action);
             if (null != receiver) {
                 mContext.unregisterReceiver(receiver);
                 cachedReceiver.remove(action);
             }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void unregisterBroadcast() {
        mContext.unregisterReceiver(receiver);
    }
}
