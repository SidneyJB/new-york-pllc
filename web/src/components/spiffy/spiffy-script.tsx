import Script from 'next/script'

/**
 * Spiffy Elements loader — only mount on checkout pages (/order, /order-llc).
 * Keeping this out of the root layout avoids pulling Spiffy/Stripe/Maps on marketing LPs.
 */
export function SpiffyScript() {
  return (
    <Script
      id="spiffy-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          "use strict";
          !function(i,t){
            var f=t.spiffy=t.spiffy||[];
            if(!f.init){
              if(f.invoked){
                return void (t.console && console.warn && console.warn("Spiffy Elements included twice."));
              }
              f.invoked=!0;
              f.methods=["identify","config","debug","off","on"];
              f.factory=function(i){
                return function(){
                  var t=Array.prototype.slice.call(arguments);
                  t.unshift(i);
                  return f.push(t),f;
                }
              };
              f.methods.forEach(function(i){spiffy[i]=f.factory(i)});
              f.load=function(t,f){
                if(!spiffy.ACCOUNT){
                  spiffy.ACCOUNT=t;
                  spiffy.DOMAIN=f;
                  var e=i.createElement("script");
                  e.type="text/javascript";
                  e.async=!0;
                  e.crossorigin="anonymous";
                  e.src="https://js.static.spiffy.co/spiffy.js?a="+t;
                  var n=i.getElementsByTagName("script")[0];
                  n.parentNode.insertBefore(e,n);
                }
              };
            }
          }(document,window);
          spiffy.SNIPPET_VERSION="1.1.0";
          spiffy.config({
            hideSidebar: false,
            preserveUrlParams: true,
            trackingEnabled: true,
            autoIdentify: true,
          });
          spiffy.load("nypllc");
        `,
      }}
    />
  )
}
