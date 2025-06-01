const form= document.querySelector("#form");
const nameInput= document.querySelector("#name_input");
const emailInput= document.querySelector("#email_input");
const passwordInput= document.querySelector("#password_input");
const matchInput= document.querySelector("#match_input");
const btnInput = document.querySelector("#button_input");

const nameRegrex=/^[a-zA-Z0-9_]{3,16}$/;
const emailRegex=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const passwordRegrex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm

let valName,valEmail,valPassWord,valMatch;

nameInput.addEventListener("change",e=>{
    valName=nameRegrex.test(e.target.value)
    console.log(valName)
    validar(nameInput,valName)
})
emailInput.addEventListener("change",e=>{
    valEmail=emailRegex.test(e.target.value)
    console.log(valEmail)
    validar(emailInput,valEmail)

})
passwordInput.addEventListener("change",e=>{
    valPassWord=passwordRegrex.test(e.target.value)
    validar(passwordInput,valPassWord)

    if(matchInput.value!=="" & matchInput.value===e.target.value){
        console.log("no esta vacio y son iguales",matchInput.value);
         validar(passwordInput,true);
         validar(matchInput,true);
    }else if(matchInput.value===""){
        console.log("match input esta vacio")
    }else{
        console.log("match input esta lleno pero ya no coincide")
        validar(matchInput,false)
    }
    
    

})
matchInput.addEventListener("change",e=>{
    if(e.target.value === passwordInput.value){
        valMatch=true;
        console.log(valMatch)
        validar(matchInput,valMatch)
    }else{
        valMatch=false;
        console.log("no son iguales las claves")
    }
})

const validar=(input,value)=>{
    btnInput.disabled=valName&valEmail&valPassWord&valMatch ?false :true 

    if(value===true){
        input.classList.remove("invalidInput")
        input.classList.add("validInput")
    }else{
        input.classList.remove("validInput")
        input.classList.add("invalidInput")
    }
}


form.addEventListener("submit",async e=>{
    console.log("entre")
    e.preventDefault();

    try {
        const newUser={
            name:nameInput.value,
            email:emailInput.value,
            password:passwordInput.value
        }

        console.log(newUser,"new user")

        form.reset();

        const response = await fetch("http://localhost:3000/api/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newUser)
        })

        const result= await response.json();
        console.log(result,"resultado de la solicitud post")
    } catch (error) {
        console.log("hubo un error con el envio del formulario",error)
    }
})



