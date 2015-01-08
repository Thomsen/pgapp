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
        // TODO Auto-generated method stub
        
    }

    @Override
    public void setActivityResultCallback(CordovaPlugin plugin) {
        // TODO Auto-generated method stub
        
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
    }

}
