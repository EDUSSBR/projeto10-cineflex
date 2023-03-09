const baseUrl = 'https://mock-api.driven.com.br/api/v8/cineflex/'
const helper = {
    moviesList: baseUrl+"movies",
    movieShowTimes:  function movieShowTimes(movieID){
        return baseUrl+`movies/${movieID}/showtimes`
    },
    seats: function seats(sessionID){
        return baseUrl+`showtimes/${sessionID}/seats`
    },
    bookSeat: baseUrl+'seats/book-many',
}

export const services = {
    getMoviesList: async function getMoviesList(){
        return await fetch(helper.moviesList)
    },
    getMovieShowTimes: function getMovieShowTimes(movieID){
        return fetch(helper.movieShowTimes(Number(movieID)))
    },
    getSeats: function getSeats(sessionID){
        return fetch(helper.seats(sessionID))
    },
    bookSeat: function bookSeat(body){
        let headers =  new Headers()
        headers.append("Content-Type", "application/json")
        return fetch(helper.bookSeat, {method:'POST', headers, body:JSON.stringify(body)})
    },
}