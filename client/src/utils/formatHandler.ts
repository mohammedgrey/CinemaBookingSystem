export const formatPrice = (
  price: number | string,
  currency?: string,
  lang?: "en" | "ar"
) => {
  let formatedPrice = `${(+price).toFixed(2)}`;
  if (lang === "ar") {
    // const arabicNumbersString = "۰١٢٣٤٥٦٧٨٩";
    // const arabicNumbers = arabicNumbersString.split("");
    // formatedPrice = `${(+price).toFixed(2)}`.replace(/\d/g, function (m) {
    //   return arabicNumbers[parseInt(m)];
    // });
  }

  const currencies: any = {
    EGP: {
      en: "EGP",
      ar: "جنيه",
    },
  };
  return (
    formatedPrice + " " + (currencies[currency ?? "EGP"][lang ?? "en"] || "")
  );
};
export const calculatePrice = (
  price: number | string,
  discount: number | string
) => {
  const calculatedPrice = +price - +price * ((+discount || 0) / 100);
  return calculatedPrice;
};
