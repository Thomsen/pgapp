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
import android.content.ComponentName;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import java.util.List;

public class ContextCallPlugin extends CordovaPlugin {

    public static final String EXTRA_CONTEXT_VALUE = "context_value";

    private static final String CALL_ACTIVITY_ACTION = "callActivity";

    private static final String CALL_SERVICE_ACTION = "callService";

    private static final String STOP_SERVICE_ACTION = "stopService";

    private static final String CALL_BROADCAST = "callBroadcast";

    private CallbackContext mCallbackContext;

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        Log.i("thom", "cordova plugin args");
        mCallbackContext = callbackContext;
        if (CALL_ACTIVITY_ACTION.equals(action)) {

        }
        return super.execute(action, args, callbackContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
        throws JSONException {
        Log.i("thom", "cordova plugin json");
        mCallbackContext = callbackContext;
        if (CALL_ACTIVITY_ACTION.equals(action)) {
            return callActivity(args, callbackContext);
        }
        if (CALL_SERVICE_ACTION.equals(action)) {
            callService(args, callbackContext);
        }
        if (STOP_SERVICE_ACTION.equals(action)) {
            stopService(args, callbackContext);
        }
        return super.execute(action, args, callbackContext);
    }

    private boolean callActivity(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String action = args.getString(0);  // JSONException
        String contextValue = args.getString(1);
        Intent intent = new Intent();
        intent.setAction(action);
        intent.putExtra(EXTRA_CONTEXT_VALUE, contextValue);
        this.cordova.startActivityForResult(this, intent, 1);

        PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
        plugResult.setKeepCallback(true);
        callbackContext.sendPluginResult(plugResult);
        //callbackContext.success("success");

        return true;
    }

    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (Activity.RESULT_OK == resultCode && null != intent) {
            String result = intent.getStringExtra("result");
            Log.i("thom", "activit result " + result);
            mCallbackContext.success(result);
        }
    }

    private void callService(final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    String action = null;
                    try {
                        action = args.getString(0);
                        Log.i("thom", "call service: " + action);
                    } catch (JSONException e) {
                        e.printStackTrace();
                        return ;
                    }
                    Intent intent = new Intent();
                    intent.setAction(action);
                    Intent explicitIntent = new Intent(getExplicitIntent(intent));
                    Context context = cordova.getActivity();
                    context.startService(explicitIntent);

                    PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
                    plugResult.setKeepCallback(true);
                    callbackContext.sendPluginResult(plugResult);
                }
         });
    }

    private void stopService(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String action = args.getString(0);
        Intent intent = new Intent();
        intent.setAction(action);
        Intent explictIntent = new Intent(getExplicitIntent(intent));
        Context context = this.cordova.getActivity();
        context.stopService(explictIntent);

        PluginResult plugResult = new PluginResult(PluginResult.Status.NO_RESULT);
        plugResult.setKeepCallback(true);
        callbackContext.sendPluginResult(plugResult);
    }

    private Intent getExplicitIntent(Intent implicitIntent) { // android 5.0 service intent must be explicit
        PackageManager pm = this.cordova.getActivity().getPackageManager();
        List<ResolveInfo> resolveInfo = pm.queryIntentServices(implicitIntent, 0);

        if (null == resolveInfo || 1 != resolveInfo.size()) {
            return null;
        }

        ResolveInfo serviceInfo = resolveInfo.get(0);
        String packageName = serviceInfo.serviceInfo.packageName;
        String className = serviceInfo.serviceInfo.name;
        ComponentName component = new ComponentName(packageName, className);

        Intent explicitIntent = new Intent(implicitIntent);
        explicitIntent.setComponent(component);
        return explicitIntent;
    }

}
