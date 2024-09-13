export const MONTHS = {
  0: "janvier", // Les mois commencent à 0 en JavaScript, donc on aligne l'indexation ici.
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth()];
// getMonth() renvoie un nombre de 0 à 11, donc l'index du tableau MONTHS doit aussi commencer à 0.
// Alternative : Si les mois sont indexés de 1 à 12, il faut utiliser `MONTHS[date.getMonth() + 1]`.
