const form = document.getElementById('contact-form')
const errorMessage = document.querySelector('.error-message')
const successMessage = document.querySelector('.sent-message')
const loading = document.querySelector('.loading')
const nameField = document.querySelector('input[name=name]')
const emailField = document.querySelector('input[name=email]')
const subjectField = document.querySelector('input[name=subject]')
const message = document.querySelector('textarea[name=message]')
const submitBtn = form.querySelector('button[type=submit]')


form.addEventListener('submit' , submitForm)

function submitForm(e){
    e.preventDefault()
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    
    if(nameField.value.length < 3){
        errorMessage.style.display = 'block'
        errorMessage.innerText = 'Please fill name field properly.'
        return
    }else if(!regex.test(emailField.value)){
        errorMessage.style.display = 'block'
        errorMessage.innerText = 'Please fill valid email.'
        return
    }else if(subjectField.value.length < 3){
        errorMessage.style.display = 'block'
        errorMessage.innerText = 'Please fill subject field properly.'
        return
    }else if(message.value.length < 5){
        errorMessage.style.display = 'block'
        errorMessage.innerText = 'Please enter a proper message '
        return
    }else{
        errorMessage.style.display = 'none'
        errorMessage.innerText = ''
        successMessage.innerText = 'form submitting....'
        successMessage.style.display = 'block'
        submitBtn.style.display = 'none'
    }

    const formData = new FormData(form)

    let api = 'https://script.google.com/macros/s/AKfycbypkqbl2SYrLdyy7h9h6-82GpZ4cZfgb650ksdQE0nNE_GKi_1ycuxNlvmYKewuXAE/exec'
    
    fetch(api , {

        method : 'post',
        body : formData

    }).then(function(response){

        return response.json()

    }).then(function(result){
        
        successMessage.innerText = 'form submitted'

        setTimeout(()=>{
            successMessage.innerText = ''
            successMessage.style.display = 'none'
            form.reset()
            submitBtn.style.display = 'inline-block'
        },3000)

    })

}