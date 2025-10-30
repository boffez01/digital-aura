"use client"

import { useLanguage } from "@/app/contexts/language-context"
import Navbar from "@/app/components/navbar"
import { Mail, Phone, MapPin, Shield } from "lucide-react"
import { useEffect } from "react"

export default function ContactPage() {
  const { language } = useLanguage()

  useEffect(() => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.innerHTML = `
      (function() {
        try {
          var f = document.createElement("iframe");
          
          var ifrmSrc = 'https://forms.zoho.eu/praxisfutura1/form/Contattaci1/formperma/U8bRQgQnhMcvyGnKeTA_kNAPdLWm8Fm9LZpTSLzFYMw?zf_rszfm=1';
          
          // Detect language and add parameter
          var userLang = navigator.language || navigator.userLanguage;
          var langCode = 'en'; // default
          if (userLang.toLowerCase().startsWith('it')) {
            langCode = 'it';
          }
          
          // Add language parameter to URL
          ifrmSrc = ifrmSrc + '&zf_hl=' + langCode;
          
          try {
            if ( typeof ZFAdvLead != "undefined" && typeof zfutm_zfAdvLead != "undefined" ) {
              for( var prmIdx = 0 ; prmIdx < ZFAdvLead.utmPNameArr.length ; prmIdx ++ ) {
                var utmPm = ZFAdvLead.utmPNameArr[ prmIdx ];
                utmPm = ( ZFAdvLead.isSameDomian && ( ZFAdvLead.utmcustPNameArr.indexOf(utmPm) == -1 ) ) ? "zf_" + utmPm : utmPm;
                var utmVal = zfutm_zfAdvLead.zfautm_gC_enc( ZFAdvLead.utmPNameArr[ prmIdx ] );
                if ( typeof utmVal !== "undefined" ) {
                  if ( utmVal != "" ) {
                    if(ifrmSrc.indexOf('?') > 0){
                      ifrmSrc = ifrmSrc+'&'+utmPm+'='+utmVal;
                    }else{
                      ifrmSrc = ifrmSrc+'?'+utmPm+'='+utmVal;
                    }
                  }
                }
              }
            }
            if ( typeof ZFLead !== "undefined" && typeof zfutm_zfLead != "undefined" ) {
              for( var prmIdx = 0 ; prmIdx < ZFLead.utmPNameArr.length ; prmIdx ++ ) {
                var utmPm = ZFLead.utmPNameArr[ prmIdx ];
                var utmVal = zfutm_zfLead.zfutm_gC_enc( ZFLead.utmPNameArr[ prmIdx ] );
                if ( typeof utmVal !== "undefined" ) {
                  if ( utmVal != "" ){
                    if(ifrmSrc.indexOf('?') > 0){
                      ifrmSrc = ifrmSrc+'&'+utmPm+'='+utmVal;
                    }else{
                      ifrmSrc = ifrmSrc+'?'+utmPm+'='+utmVal;
                    }
                  }
                }
              }
            }
          }catch(e){}
          
          f.src = ifrmSrc;
          f.style.border="none";
          f.style.height="934px";
          f.style.width="90%";
          f.style.transition="all 0.5s ease";
          f.setAttribute("aria-label", 'Contattaci');
          
          var d = document.getElementById("zf_div_U8bRQgQnhMcvyGnKeTA_kNAPdLWm8Fm9LZpTSLzFYMw");
          if (d) {
            d.appendChild(f);
          }
          
          window.addEventListener('message', function (event){
            var evntData = event.data;
            if( evntData && evntData.constructor == String ){
              var zf_ifrm_data = evntData.split("|");
              if ( zf_ifrm_data.length == 2 || zf_ifrm_data.length == 3 ) {
                var zf_perma = zf_ifrm_data[0];
                var zf_ifrm_ht_nw = ( parseInt(zf_ifrm_data[1], 10) + 15 ) + "px";
                var iframe = document.getElementById("zf_div_U8bRQgQnhMcvyGnKeTA_kNAPdLWm8Fm9LZpTSLzFYMw").getElementsByTagName("iframe")[0];
                if ( (iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0 ) {
                  var prevIframeHeight = iframe.style.height;
                  var zf_tout = false;
                  if( zf_ifrm_data.length == 3 ) {
                    iframe.scrollIntoView();
                    zf_tout = true;
                  }

                  if ( prevIframeHeight != zf_ifrm_ht_nw ) {
                    if( zf_tout ) {
                      setTimeout(function(){
                        iframe.style.height = zf_ifrm_ht_nw;
                      },500);
                    } else {
                      iframe.style.height = zf_ifrm_ht_nw;
                    }
                  }
                }
              }
            }
          }, false);
        }catch(e){}
      })();
    `

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@praxisfutura.com",
      subtitle: language === "it" ? "Rispondiamo entro 2 ore" : "We respond within 2 hours",
    },
    {
      icon: Phone,
      title: language === "it" ? "Telefono" : "Phone",
      value: "+393500216480",
      subtitle: language === "it" ? "Lun-Ven 9:00-18:00" : "Mon-Fri 9:00-18:00",
    },
    {
      icon: MapPin,
      title: language === "it" ? "Ufficio" : "Office",
      value: "Brescia, Italia",
      subtitle: "Via Dei Mille 5",
    },
    {
      icon: Shield,
      title: language === "it" ? "Garanzia Qualità" : "Quality Guarantee",
      value: language === "it" ? "Soddisfatti o rimborsati" : "Satisfied or refunded",
      subtitle: language === "it" ? "Entro 30 giorni" : "Within 30 days",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === "it" ? "Contattaci" : "Contact Us"}
          </h1>
          <p className="text-lg text-gray-600">
            {language === "it"
              ? "Siamo qui per aiutarti. Compila il modulo e ti risponderemo al più presto."
              : "We're here to help. Fill out the form and we'll get back to you as soon as possible."}
          </p>
        </div>

        {/* Contact Info Cards - Vertical Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 text-white p-3 rounded-lg">
                  <info.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                  <p className="text-gray-800 font-medium mb-1">{info.value}</p>
                  <p className="text-sm text-gray-600">{info.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zoho Form */}
        <div className="mt-0 overflow-hidden">
          <div id="zf_div_U8bRQgQnhMcvyGnKeTA_kNAPdLWm8Fm9LZpTSLzFYMw" className="flex justify-center" />
        </div>
      </div>
    </div>
  )
}
