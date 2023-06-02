let myLeads = []
const inputBox = document.getElementById("input-el")
const saveInputBtn = document.getElementById("saveInput-btn")
const saveTabBtn = document.getElementById("saveTab-btn")
const deleteBtn = document.getElementById("delete-btn")
const lists = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))

if ( leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


saveTabBtn.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                  ${leads[i]}
            </a>
        </li> 
        
        `
    }

    lists.innerHTML = listItems
}

deleteBtn.addEventListener('click', function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

saveInputBtn.addEventListener('click', function() {
    myLeads.push(inputBox.value)
    inputBox.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

