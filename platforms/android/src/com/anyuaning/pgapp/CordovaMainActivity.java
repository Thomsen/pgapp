package com.anyuaning.pgapp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import org.apache.cordova.Config;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CordovaMainActivity extends Activity implements CordovaInterface {

    CordovaWebView mCordovaWebView;
    private CordovaPlugin activityResultCallback;
    private Object activityResultKeepRunning;
    private boolean keepRunning;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cordova_main);
        mCordovaWebView = (CordovaWebView) findViewById(R.id.cordova_webview);
        
        Config.init(this);
        mCordovaWebView.loadUrl(Config.getStartUrl());
    }
    
    @Override
    public void startActivityForResult(CordovaPlugin command, Intent intent, int requestCode) {
        this.activityResultCallback = command;
        this.activityResultKeepRunning = this.keepRunning;

        // If multitasking turned on, then disable it for activities that return results
        if (command != null) {
            this.keepRunning = false;
        }

        // Start activity
        super.startActivityForResult(intent, requestCode);
    }

    @Override
    public void setActivityResultCallback(CordovaPlugin plugin) {
        this.activityResultCallback = plugin;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        CordovaPlugin callback = this.activityResultCallback;
        if (callback != null) {
            callback.onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    public Activity getActivity() {
        return this;
    }

    @Override
    public Object onMessage(String id, Object data) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ExecutorService getThreadPool() {
        return Executors.newCachedThreadPool();
        // 01-13 16:50:19.520: W/MediaProvider/DrmHelper(8346): not support DRM!
        // 01-13 16:50:19.545: W/PluginManager(19594): THREAD WARNING: exec()
        // call to Camera.takePicture blocked the main thread for 28ms. Plugin should use CordovaInterface.getThreadPool().
        
        // need implement start/set Activity Result Callback
    }

}
