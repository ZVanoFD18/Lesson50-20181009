'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let chat = document.getElementById('hiroes-chat'),
        form = chat.getElementsByClassName('chat-form')[0];
    form.elements['button-send'].addEventListener('click', function (event) {
        event.preventDefault();
        let newMessageEl = document.createElement('div');
        newMessageEl.classList.add('messages-row');
        newMessageEl.appendChild((function () {
            let el = document.createElement('span');
            //el.dataset.id="hiro-name"
            el.classList.add('messages-sender');
            el.innerHTML = form.elements['hiro'].value;
            return el;
        })());
        newMessageEl.appendChild((function () {
            let el = document.createElement('span');
            el.classList.add('messages-text');
            el.innerHTML = form.elements['message'].value;
            return el;
        })());

        chat.querySelector('[data-id="messages"]').appendChild(newMessageEl);
        return false;
    });

    chat.getElementsByClassName('chat-icon-right')[0].addEventListener('click', function (event) {
        chat.style.right = '0px';
        chat.style.top = '0px';
        chat.style.left =  'auto';
    });
    chat.getElementsByClassName('chat-icon-close')[0].addEventListener('click', function (event) {
        chat.classList.add('chat-closed');
    });

    chat.getElementsByClassName('chat-title-text')[0].addEventListener('mousedown', function (eventDown) {
        eventDown.target.classList.add('chat-title-text-moveing');
        console.log('mousedown');
        let chat = eventDown.target.closest('.chat'),
            startPos = chat.getBoundingClientRect(),
            offsetX = startPos.x - eventDown.clientX,
            offsetY = startPos.y - eventDown.clientY
        ;
        console.log({
            chat: chat,
            startPos: startPos,
            eventDown: eventDown,
            offsetX : offsetX,
            offsetY :offsetY
        });

        document.addEventListener('mouseup', function fDocumentMouseup() {
            console.log('mouseup');
            document.removeEventListener('mouseup', fDocumentMouseup);
            document.removeEventListener('mousemove', fDocumentMousemove);
            eventDown.target.classList.remove('chat-title-text-moveing');
        });
        //chat.style.right = 'unset'; // https://developer.mozilla.org/en-US/docs/Web/CSS/unset
        chat.style.right = 'auto';
        let fDocumentMousemove = function (eventMove) {
            chat.style.top = eventMove.clientY + offsetY + 'px';
            chat.style.left = eventMove.clientX + offsetX + 'px';
        };
        document.addEventListener('mousemove', fDocumentMousemove);
    });
});