'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let chat = document.getElementById('hiroes-chat'),
        chatOpened = chat.querySelector('.chat-opened'),
        chatCollapsed = chat.querySelector('.chat-collapsed'),
        chatForm = chatOpened.getElementsByClassName('chat-form')[0];
    chatForm.elements['button-send'].addEventListener('click', function (event) {
        event.preventDefault();
        let newMessageEl = document.createElement('div');
        newMessageEl.classList.add('messages-row');
        newMessageEl.appendChild((function () {
            let el = document.createElement('span');
            //el.dataset.id="hiro-name"
            el.classList.add('messages-sender');
            el.innerHTML = chatForm.elements['hiro'].value;
            return el;
        })());
        newMessageEl.appendChild((function () {
            let el = document.createElement('span');
            el.classList.add('messages-text');
            el.innerHTML = chatForm.elements['message'].value;
            return el;
        })());

        chatOpened.querySelector('[data-id="messages"]').appendChild(newMessageEl);
        return false;
    });
    chatCollapsed.querySelector('.chat-collapsed-text').addEventListener('click', function (event) {
        chatOpened.classList.toggle('chat-hidden');
        chatCollapsed.classList.toggle('chat-hidden');
    });

    chatOpened.querySelector('.chat-icon-normalize').addEventListener('click', function (event) {
        chatOpened.style.right = '0px';
        chatOpened.style.top = '0px';
        chatOpened.style.left =  'auto';
    });
    chatOpened.querySelector('.chat-icon-close').addEventListener('click', function (event) {
        chatOpened.classList.add('chat-hidden');
        chatCollapsed.classList.add('chat-hidden');
    });
    chatOpened.querySelector('.chat-icon-collapse').addEventListener('click', function (event) {
        chatOpened.classList.toggle('chat-hidden');
        chatCollapsed.classList.toggle('chat-hidden');
    });
    chatOpened.querySelector('.chat-title-text').addEventListener('mousedown', function (eventDown) {
        eventDown.target.classList.add('chat-title-text-moveing');
        console.log('mousedown');
        let startPos = chatOpened.getBoundingClientRect(),
            offsetX = startPos.x - eventDown.clientX,
            offsetY = startPos.y - eventDown.clientY
        ;
        document.addEventListener('mouseup', function fDocumentMouseup() {
            console.log('mouseup');
            document.removeEventListener('mouseup', fDocumentMouseup);
            document.removeEventListener('mousemove', fDocumentMousemove);
            eventDown.target.classList.remove('chat-title-text-moveing');
        });
        //chatOpened.style.right = 'unset'; // https://developer.mozilla.org/en-US/docs/Web/CSS/unset
        chatOpened.style.right = 'auto';
        let fDocumentMousemove = function (eventMove) {
            chatOpened.style.top = eventMove.clientY + offsetY + 'px';
            chatOpened.style.left = eventMove.clientX + offsetX + 'px';
        };
        document.addEventListener('mousemove', fDocumentMousemove);
    });
});