// api URL: https://www.themoviedb.org/

const main = document.querySelector("main")
const formWrapper = document.querySelector("form")
const searchInput = document.querySelector("form #serach-input")

const key = "f1be0a39b875a10c70adf58baa070cfb"
const moviesSortByPopularityURL = "https://api.themoviedb.org/3/discover/movie?api_key="+ key +"&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
const getMoviesByQueryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query="

async function getMovies(query){
    let result;

    // get Movies from api; response typye json
    async function getApiResult(API_URL){
        let query = await fetch(API_URL)
        result = await query.json()
        return result.results
    }

    if (arguments.length > 0){
        result = getApiResult(getMoviesByQueryURL + arguments[0])
    }
    else{
        result = getApiResult(moviesSortByPopularityURL)
    }
    
    // 
    main.innerHTML = ""
    
    // stock api results
    let data = await result
    
    // add movies
    
    data.forEach((movie, ind) => {
        // console.log(movie.poster_path)
        let titleData = movie.original_title
        let imgPathData = movie.poster_path
        let overviewData = movie.overview
        let rateData = parseFloat(movie.vote_average).toFixed(1)

        // create HTML elements
        let parentElement = document.createElement("div")
        let poster = document.createElement("div")
        let img = document.createElement("img")
        let infosWraper = document.createElement("div")
        let movieTitle = document.createElement("h3")
        let rateBoxe = document.createElement("span")
        let overview = document.createElement("p")

        // add attributes 
        parentElement.className = "movie"
        poster.className = "poster"
        img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path
        img.alt = titleData
        infosWraper.className = "infos"
        rateBoxe.className = "rate"
        overview.className = "overview"
        
        // add values
        movieTitle.textContent = titleData
        rateBoxe.textContent = rateData
        overview.textContent = overviewData

        // add nodes to html
        // logic check if the datas are avalaible
        if (!imgPathData){
            img.src = "pics/e404.jpg"
        }
    
        main.appendChild(parentElement)  
        parentElement.appendChild(poster) 
        poster.appendChild(img)
        parentElement.appendChild(infosWraper)
        infosWraper.appendChild(movieTitle)
        if (rateData > 0){
            infosWraper.appendChild(rateBoxe)
        }
        if (overviewData){
            parentElement.appendChild(overview)
        }
    });

}

getMovies()

formWrapper.addEventListener("submit", (e) =>{
    e.preventDefault()
    getMovies(searchInput.value)
    searchInput.value = ""
})
