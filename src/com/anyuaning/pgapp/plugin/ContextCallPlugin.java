package com.anyuaning.pgapp.plugin;

import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;

public class ContextCallPlugin extends CordovaPlugin {

    private static final String CALL_CONTEXT_ACTION = "callContext";

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        Log.i("thom", "cordova plugin args");
        if (CALL_CONTEXT_ACTION.equals(action)) {

        }
        return super.execute(action, args, callbackContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
        throws JSONException {
        Log.i("thom", "cordova plugin json");
        if (CALL_CONTEXT_ACTION.equals(action)) {
            String message = args.getString(0);
            Intent intent = new Intent();
            intent.setAction(message);
            this.cordova.startActivityForResult(this, intent, 1);

            PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
            plugResult.setKeepCallback(true);
            callbackContext.sendPluginResult(plugResult);
            callbackContext.success("success");
        }
        return super.execute(action, args, callbackContext);
    }

}