import { TIME_OUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIME_OUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
    return data;
  } catch (error) {
    console.error(`error in helper ${error}`);
    throw error;
  }
};

// export const getJson = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIME_OUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
//     return data;
//   } catch (error) {
//     console.error(`error in helper ${error}`);
//     throw error;
//   }
// };

// export const sendJson = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIME_OUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
//     return data;
//   } catch (error) {
//     console.error(`error in helper ${error}`);
//     throw error;
//   }
// };
