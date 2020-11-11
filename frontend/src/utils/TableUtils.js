export default function selectTableBody(event) {
  const tbody = event.target.parentNode.parentNode;
  for (let i = 0; i < tbody.children.length; i++) {
    tbody.children[i].classList.remove('selected')
  }
  event.target.parentNode.classList.add('selected');
};