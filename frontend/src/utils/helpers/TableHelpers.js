export default function selectTableBodyIndex(event) {
  const tbody = event.target.parentNode.parentNode;
  for (let i = 0; i < tbody.children.length; i++) {
    tbody.children[i].classList.remove('selected')
  }
  event.target.parentNode.classList.add('selected');
  console.log(event.target.parentNode)
  return event.target.parentNode.rowIndex - 1;
};