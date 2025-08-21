"use client";
import React from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import { removeGoogleAnalyticsCookies } from "@/lib/analytics";

const CookieConsentBanner = () => {
  const handleDecline = () => {
    removeGoogleAnalyticsCookies();
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="同意する"
      declineButtonText="拒否"
      cookieName="ga-consent-v0"
      style={{ background: "#2B373B" }}
      buttonStyle={{
        color: "#ffffff",
        fontSize: "13px",
        backgroundColor: "#4e503b",
        borderRadius: "5px",
      }}
      declineButtonStyle={{
        color: "#ffffff",
        fontSize: "13px",
        backgroundColor: "#6c757d",
        borderRadius: "5px",
      }}
      expires={180}
      enableDeclineButton
      onAccept={() => {
        // 同意時の処理（必要に応じて）
      }}
      onDecline={handleDecline}
    >
      <p>
        当サイトでは、ユーザー体験の向上とサイトの利用状況分析のためにCookieを使用しています。
        これには、Google Analyticsによるトラフィック分析が含まれます。
        Cookieの使用に同意いただくことで、よりよいサービスの提供に役立てることができます。
        詳しくは
        <Link href="/about" className="text-blue-400 hover:underline">
          プライバシーポリシー
        </Link>
        をご確認ください。
      </p>
    </CookieConsent>
  );
};

export default CookieConsentBanner;