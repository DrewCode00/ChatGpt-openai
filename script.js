import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer =document.querySelector('#chat_container')

let loadInterval

function loader(element){
  element.textContent =''

  loadInterval =setInterval(()=>{
    //updated the text content of the loading indicator
    element.textContent +='.';


    //If the loading indicator has reached three dots, reset it

    if(element.textContent === '.....'){
      element.textContent ='';

    }

  },300);

}


function typeText(element, text){
  let index = 0
  let interval = setInterval(()=>{

    if(index < text.length){
      element.innerHTML += text.charAt(index)
      index++
    }else{
      clearInterval(interval)
    }
    }, 20)
  
}


//generate unique ID for Each message div of bot
//necessary for typing text effect for that specific reply
//without unique ID, Typing text will work on every element

function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;

}
function chatStripe(isAi, value, uniqueId){

  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
            <div class="profile">
                <img 
                  src=${isAi ? bot : user} 
                  alt="${isAi ? 'bot' : 'user'}" 
                />
            </div>
            <div class="message" id=${uniqueId}>${value}</div>
        </div>
    </div>
`
)
}



const handleSubmit = async(e) => {
  e.preventDefault()

  const data = new FormData(Form)

  //User's Chatstripe
  chatContainer.innerHTML += chatStripe(failse,data.get('prompt'))

  //To clear the textArea Input

  form.reset()


  //bot's chatStripe

  const uniqueId =generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)


  //To focus scroll to the bottom

  chatContainer.scrollTop =chtContainer.scrollHeight;


  //Specific Message Div

  const meassgeDiv = document.getElementById(uniqueId)


  //mesaageDiv.innerHTML ="..."
  loader(messageDiv)


  const response = await fetch('https://codexim0y.onrender.com/',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',

    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval)
  messageDiv.innerHTML =" "


  if(response.ok){
    const data = await response.json();
    const parseData = data.bot.trim() // Trims any trailing spaces/'\n'abort


    typeText(mesaageDiv, parsedData)
  }else{
    const err = await response.text()

    messageDiv.innerHTML = "Something Went wrong"
    alert(err)
  }
    }
  

    form.addEventListner('submit', handleSubmit)
    form.addEventListener('keyup', (e) => {
      if(e.keyCode ===3){
        handleSubmit(e)
      }
    })

