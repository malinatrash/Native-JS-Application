import './static/style.css'
import {createModal, isValid} from "./utils";
import {Question} from "./question";
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const form = document.getElementById('form')
const modalButton = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const sumbitButton = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)

form.addEventListener('submit', submitFormHandler)
modalButton.addEventListener('click', openModal)
input.addEventListener('input', () => {
    sumbitButton.disabled = !isValid(input.value)
})

function openModal() {
    createModal('Auth', getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault()
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModelAfterAuth)
}

function renderModelAfterAuth(content) {
    if (typeof content == 'string') {
        createModal('Error!', content)
    } else {
        createModal('Question list', Question.listToHTML(content))
    }
}

function submitFormHandler(event) {
    event.preventDefault()
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()

        }
        sumbitButton.disabled = true

        // Async request to server to save question
        Question.create(question).then(() => {
            console.log('Question: ', question);
            input.value = ''
            input.className = ''
            sumbitButton.disabled = false
        })
    }
}