let store = []
const buttonEl = document.getElementById("button-el")
const inputEl = document.getElementById("input-el")
const unEl = document.getElementById("ul-el")
const deleteButton = document.getElementById("delete-button")
const tabBtn = document.getElementById("tab-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
  store = leadsFromLocalStorage
  render(store)
}

deleteButton.addEventListener("dblclick",function(){
  localStorage.clear()
  store=[]
  render(store)
})

buttonEl.addEventListener("click",function() {
    store.push(inputEl.value)
    localStorage.setItem("myLeads",JSON.stringify(store))
    inputEl.value=''
    render(store)
})

tabBtn.addEventListener("click",function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    store.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(store) )
    render(store)
})
})

function render(leads){
  let items = ""
  for(let i=0;i<leads.length;i++){
      items +=`
        <li>
          <a href='${leads[i]}' target='_blank'>
            ${leads[i]}
          </a>
        </li>
      `
    }
    unEl.innerHTML = items
}

