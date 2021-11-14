package com.partner;
//Get HashKey
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

//  private FirebaseAnalytics mFirebaseAnalytics;
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "partner";
  }
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
//     Obtain the FirebaseAnalytics instance.
//    mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);
    super.onCreate(null);

    getHashKey();
  }
  private void getHashKey(){
    PackageInfo packageInfo = null;
    try {
      packageInfo = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
    if (packageInfo == null)
      Log.e("KeyHash", "KeyHash:null");

    for (Signature signature : packageInfo.signatures) {
      try {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        Log.d("KeyHash", Base64.encodeToString(md.digest(), Base64.DEFAULT));
      } catch (NoSuchAlgorithmException e) {
        Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
      }
    }
  }

  // Analytics
//  Bundle bundle = new Bundle();
//  bundle.putString(FirebaseAnalytics.Param.ITEM_ID, id);
//  bundle.putString(FirebaseAnalytics.Param.ITEM_NAME, name);
//  bundle.putString(FirebaseAnalytics.Param.CONTENT_TYPE, "image");
//  mFirebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_CONTENT, bundle);
}
