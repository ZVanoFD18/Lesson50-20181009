function ContextMenuItem(text, itemId, userData, handler) {
    this.text = text;
    this.itemId = itemId;
    this.userData = userData || undefined;
    this.handler = handler || function () {
    }
}