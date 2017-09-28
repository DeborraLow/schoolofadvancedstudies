import scss from './post_truth.scss';
var modalsList = document.getElementsByClassName('modal-a');
for(let i=0;i<modalsList.length;i++){
  modalsList[i].addEventListener('click',(e)=>{
    e.target.nextSibling.style.display = 'block';
    e.target.nextSibling.lastChild.addEventListener('click',()=>{
      e.target.nextSibling.style.display = 'none';
    })
})
}
document
