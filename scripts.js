const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);


    // Bæti event listener við alla hlutina á listanum
    const checkbox = document.getElementsByClassName('item__checkbox');
    for(let i = 0; i < checkbox.length; i++){
      checkbox[i].addEventListener('click', finish);
    }

    const button = document.getElementsByClassName('item__button');
    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener('click',deleteItem);
    }

    const text = document.getElementsByClassName('item__text');
    for (let i = 0; i < text.length; i++) {
      text[i].addEventListener('click',edit);
    }   
  }

  function formHandler(e) {
    e.preventDefault();

    const form__input = document.getElementsByClassName('form__input')[0];
    const check = form__input.value;

    // Athugar hvort form__input er tómt
    if (check.length == 0 || !check.replace(/\s/g, '').length) {}
    else {
      add(form__input.value);
      form__input.value = ''; 
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    // Bý til nýtt element input sem hefur sama texta og item__text elementið sem það var áður
    var input = document.createElement('input');
    input.className = 'item__edit';
    input.type = 'text';
    input.value = e.target.innerHTML;
    e.target.replaceWith(input);
    input.focus();

    // Þegar ýtt er á takka á lyklaborði fer forritið í commit fallið
    input.addEventListener('keydown', commit);
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    console.log('commit1');
    // Vistar texta ef ýtt er á Enter takkann á lyklaborði og breytir aftur í item__text
    if (e.which === ENTER_KEYCODE) {
      var text = document.createElement('span');
      text.className = 'item__text';
      text.type = 'text';
      text.innerHTML = e.target.value;
      e.target.replaceWith(text);

      text.addEventListener('click',edit);   
    }

  }

  // fall sem sér um að bæta við nýju item
  function add(value) {

    // bý til elementin sem fara í nýja listann
    var newLi = el('li','item','item',);
    var newCheck = el('input','checkbox','item__checkbox',finish);
    var newText = el('span','text', 'item__text',edit);
    var newButton = el('button','button','item__button',deleteItem);

    // Texti tekinn úr form__item til að setja í nýja item__text
    newText.innerHTML = value;
    // Texti á nýjum takka
    newButton.innerHTML = 'Eyða';

    // set nýju elementin í listann
    newLi.appendChild(newCheck);
    newLi.appendChild(newText);
    newLi.appendChild(newButton);
    items.appendChild(newLi);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentNode.remove();
  }

  // hjálparfall til að útbúa element
  function el(eltype, type, className, clickHandler) {
    var el = document.createElement(eltype);
    el.type = type;
    el.className = className;
    el.addEventListener('click',clickHandler);

    return el;
  }

  return {
    init: init
  }
})();
