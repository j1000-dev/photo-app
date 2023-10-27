import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function Logout() {
  const { logout } = useAuth0();

  return (
    <button className="btn btn-secondary me-4" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
}

export default Logout