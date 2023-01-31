import './static/style.css'
import {isValid} from "./utils";
import {Question} from "./question";

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const sumbitButton = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    sumbitButton.disabled = !isValid(input.value)
})

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