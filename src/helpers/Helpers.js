export const showNotification = (setter) => {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
};

export const checkWin = (correct, wrong, word) => {
  let status = "win";

  word.split("").forEach((letter) => {
    if (!correct.includes(letter)) {
      status = "";
    }
  });

  if (wrong.length === 6) status = "lose";

  return status;
};

// export const getWords = async () => {
//   const response = await fetch(
//     "https://random-word-form.herokuapp.com/random/noun"
//   );
//   const [word] = await response.json();
//   console.log(word);
//   return word;
// };
