export const addEmail = async (payload) => {
  const resp = await fetch("http://localhost:3001/addMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = resp.json();
  return data;
};

export const sendMail = async (payload) => {
  const resp = await fetch("http://localhost:3001/sendMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = resp.json();
  return data;
};

export const unsub = async (payload) => {
  const resp = await fetch("http://localhost:3001/unsub", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = resp.json();
  return data;
};
