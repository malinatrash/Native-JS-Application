export const isValid = (value) => {
    return value.length >= 10
}

export function createModal(title, content) {
    const modal = document.createElement('div')
    modal.position = 'absolute';
    modal.top = '50%';
    modal.style.padding = '50px';
    modal.style.textAlign = 'center'
    modal.style.borderRadius = '50px';
    modal.style.maxWidth = '600px';
    modal.style.maxHeight = '300px';
    modal.style.margin = '100px auto';
    modal.style.backgroundColor = '#fff';
    modal.innerHTML = `
        <h1>${title}</h1>
        <div style="padding: 1rem">${content}</div>
    `

    mui.overlay('on', modal)
}