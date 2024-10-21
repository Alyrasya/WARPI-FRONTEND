"use client";

import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { TokenUtil } from "#/utils/token";

TokenUtil.loadToken();
export const Provider = ({ children }: any) => {
  // useEffect(() => {
  //   // @ts-ignore
  //   document.documentElement.style.opacity = 1
  // }, []);

<<<<<<< HEAD
  return <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#543310',
      },
    }}
  >
    {children}
  </ConfigProvider>
}
=======
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#543310",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
>>>>>>> 4388cc56a431649e0b8b232387ceb2ef46de2907
