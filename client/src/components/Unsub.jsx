import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unsub } from "../api";
import ClipLoader from "react-spinners/ClipLoader";

function Unsub() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(async () => {
    const payload = { id: id };
    const data = await unsub(payload);
    setIsLoading(false);
  }, []);
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      {isLoading ? (
        <ClipLoader color="#386fa4" />
      ) : (
        <p className="text-white text-2xl">
          You have successfully unsubscribed. Hope to see you in future 😔
        </p>
      )}
    </div>
  );
}

export default Unsub;
