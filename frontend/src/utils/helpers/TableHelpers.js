export function selectTableRow(event) {
  return event.target.parentNode.rowIndex - 1;
};
