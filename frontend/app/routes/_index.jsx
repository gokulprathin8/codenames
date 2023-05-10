import React from "react";
import {useNavigate} from "@remix-run/react";
import {redirect} from "@remix-run/node";

export const meta = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
    const navigate = useNavigate();
    redirect('/auth/login');

  return (
    <React.Fragment>
        <div>Home</div>
    </React.Fragment>
  );
}
