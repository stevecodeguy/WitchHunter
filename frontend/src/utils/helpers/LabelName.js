export default function LabelName(props) {
  if (props.labelName === undefined) {
    let firstLetter = props.name[0] || props.name.charAt(0);
    return firstLetter ? firstLetter.toUpperCase() + props.name.slice(1) : '';
  } else {
    let firstLetter = props.labelName[0] || props.labelName.charAt(0);
    return firstLetter ? firstLetter.toUpperCase() + props.labelName.slice(1) : '';
  }
}