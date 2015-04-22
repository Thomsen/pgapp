package com.anyuaning.pgapp.plugin;

import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

public class ContextCallPlugin extends CordovaPlugin {

    private static final String CALL_ACTIVITY_ACTION = "callActivity";

    private static final String CALL_SERVICE_ACTION = "callService";

    private static final String STOP_SERVICE_ACTION = "stopService";

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        Log.i("thom", "cordova plugin args");
        if (CALL_ACTIVITY_ACTION.equals(action)) {

        }
        return super.execute(action, args, callbackContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
        throws JSONException {
        Log.i("thom", "cordova plugin json");
        if (CALL_ACTIVITY_ACTION.equals(action)) {
            callActivity(args, callbackContext);
        }
        if (CALL_SERVICE_ACTION.equals(action)) {
            callService(args, callbackContext);
        }
        if (STOP_SERVICE_ACTION.equals(action)) {
            stopService(args, callbackContext);
        }
        return super.execute(action, args, callbackContext);
    }

    private void callActivity(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String message = args.getString(0);  // JSONException
        Intent intent = new Intent();
        intent.setAction(message);
        this.cordova.startActivityForResult(this, intent, 1);

        PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
        plugResult.setKeepCallback(true);
        callbackContext.sendPluginResult(plugResult);
        //callbackContext.success("success");
    }

    private void callService(final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    String message = null;
                    try {
                        message = args.getString(0);
                        Log.i("thom", "call service: " + message);
                    } catch (JSONException e) {
                        e.printStackTrace();
                        return ;
                    }
                    Intent intent = new Intent();
                    intent.setAction(message);
                    Context context = cordova.getActivity();
                    context.startService(intent);

                    PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
                    plugResult.setKeepCallback(true);
                    callbackContext.sendPluginResult(plugResult);
                }
         });
    }

    private void stopService(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String message = args.getString(0);
        Intent intent = new Intent();
        intent.setAction(message);
        Context context = this.cordova.getActivity();
        context.stopService(intent);

        PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
        plugResult.setKeepCallback(true);
        callbackContext.sendPluginResult(plugResult);
    }

}