package com.partner;

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
  }

  // Analytics
//  Bundle bundle = new Bundle();
//  bundle.putString(FirebaseAnalytics.Param.ITEM_ID, id);
//  bundle.putString(FirebaseAnalytics.Param.ITEM_NAME, name);
//  bundle.putString(FirebaseAnalytics.Param.CONTENT_TYPE, "image");
//  mFirebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_CONTENT, bundle);
}
