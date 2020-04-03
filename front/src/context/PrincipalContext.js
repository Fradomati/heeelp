import React, { createContext, useState } from "react";

export const PrincipalContext = createContext();
export const PrincipalContextProvider = props => {
  //Loading State
  const [loading, setLoading] = useState(true);

  //Users Active
  const [user, setUser] = useState();

  //Message Error Global Form
  const [messageError, setMessageError] = useState();

  //Users List CHange
  const [changeLisUsers, setchangeLisUsers] = useState(false);

  //Reviews List CHange
  const [changeListReviews, setchangeListReviews] = useState(false);

  return (
    <PrincipalContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        messageError,
        setMessageError,
        changeLisUsers,
        setchangeLisUsers,
        changeListReviews,
        setchangeListReviews
      }}
    >
      {props.children}
    </PrincipalContext.Provider>
  );
};
