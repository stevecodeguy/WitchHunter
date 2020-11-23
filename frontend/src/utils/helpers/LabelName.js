export default function LabelName(name, labelName) {
  if (labelName === undefined) {
    let firstLetter = name[0] || name.charAt(0);
    return firstLetter ? firstLetter.toUpperCase() + name.slice(1) : '';
  } else {
    let firstLetter = labelName[0] || labelName.charAt(0);
    return firstLetter ? firstLetter.toUpperCase() + labelName.slice(1) : '';
  }
}