async function getData() {

    let query = document.querySelector("#query").value

    let url = `https://swapi.dev/api/people/?search=${query}`

    try {
        let res = await fetch(url)
        let data = await res.json()
        if (data.results.length == 0) {
            notFound()
        }
        else {
            if (query != "") {
                display(data.results)
                console.log(data.results)
            }
            else {
                const append = document.querySelector('#append');
                append.innerHTML = null
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}

let personData = []

function display(data) {

    const append = document.querySelector('#append');
    append.innerText = null
    const resultsDiv = document.createElement('div');
    resultsDiv.setAttribute("id", "resultsDiv")
    append.append(resultsDiv)

    data.forEach(function (elem) {

        let results = document.createElement("div")
        results.setAttribute("id", "results")
        resultsDiv.append(results)

        results.addEventListener("click", function(){
            detailFun(elem)
        })
        const r1 = document.createElement('div');
        const name = document.createElement('div');
        name.setAttribute("id", "name")
        name.innerText = elem.name

        const birth_year = document.createElement('div');
        birth_year.innerText = elem.birth_year
        birth_year.setAttribute("id", "birth_year")

        r1.append(name, birth_year)

        const gender = document.createElement('div');
        gender.setAttribute("id", "gender")
        gender.innerText = elem.gender
        results.append(r1, gender)

    })
}

function detailFun(elem){
    personData.push(elem)
    localStorage.setItem("personData",JSON.stringify(personData))
    window.location.href = "./personDetails.html"
}

function notFound() {
    let query = document.querySelector("#query").value
    if (query != "") {
        const append = document.querySelector('#append');
        append.innerHTML = null
        const nofoundDiv = document.createElement('div');
        nofoundDiv.setAttribute("id", "nofoundDiv")

        append.append(nofoundDiv)
        let p = document.createElement("p")
        p.innerText = "No results found try again..."

        nofoundDiv.append(p)
    }
    else {
        const append = document.querySelector('#append');
        append.innerHTML = null
    }
}

let id;

function debouncing(func, delay) {
    if (id) {
        clearTimeout(id)
    }
    id = setTimeout(function () {
        func()
    }, delay)
}
