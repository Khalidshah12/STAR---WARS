async function getData() {

    let query = document.querySelector("#query").value

    let url = `https://swapi.dev/api/people/?search=${query}`

    try {
        let res = await fetch(url)
        let data = await res.json()
        display(data.results)
    }
    catch (err) {
        console.log(err)
    }


}

let id;

function display(data) {
    const resultsDiv = document.querySelector('#resultsDiv');
    resultsDiv.innerHTML = null

    let results = document.createElement("div")
    results.setAttribute("id", "results")

    resultsDiv.append(results)

    const charNameBirth = document.createElement('div');
    charNameBirth.setAttribute("id","charNameBirth")

    const male = document.createElement('div');
    male.setAttribute("id","male")

    data.forEach(function (elem) {

       
        // results.append(charNameBirth)

        let name = document.createElement("p")
        name.setAttribute("id","name")
        name.innerText = elem.name

        const birth = document.createElement('p');
        birth.setAttribute("id","birth")
        birth.innerText = elem.birth_year

        charNameBirth.append(name,birth)

        const p = document.createElement('p');
        p.innerText = elem.gender
        male.append(p)
        results.append(charNameBirth,male)

    })
}

// function notFound() {
//     let result = document.querySelector("#results")

//     let p = document.createElement("p")
//     p.innerText = "Not Found"

//     result.append(p)
// }

function debouncing(func, delay) {

    if (id) {
        clearTimeout(id)
    }

    id = setTimeout(function () {
        func()
    }, delay)

}
