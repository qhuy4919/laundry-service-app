import { SIGN_IN_URL } from "const/api-url";
import { SIGNED_IN_USER, ITEM_IN_CART } from "const/local-storage-key";

export async function callSignIn(params) {
  const fullurl = `${process.env.REACT_APP_API_SERVER}${SIGN_IN_URL}`;
  let statuscode = 600;

  // console.log(fullurl)
  await fetch(fullurl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => {
      statuscode = res.status;
      return res.json();
    })
    .then((data) => {
      localStorage.setItem(SIGNED_IN_USER, JSON.stringify(data));
      localStorage.setItem("TOKEN", data.data.user.token);
      localStorage.setItem(ITEM_IN_CART, "");
    })
    .catch((err) => {
      console.log("Error while Logging In...");
      console.log(err);
      localStorage.removeItem(SIGNED_IN_USER);
      localStorage.removeItem("TOKEN");
      localStorage.removeItem(ITEM_IN_CART);
    });
  if (statuscode < 300) return true;
  return false;
}
