import axios from "axios";

const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDk0OTI3NTdkMmExYjNmZjE1OGIyN2I3N2FlZWE2MiIsIm5iZiI6MTc1NDMwOTE5NC44NzYsInN1YiI6IjY4OTBhMjRhZjRjYjFmZGYyMGE0NmJhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zK45IcfFVV7S612K6_qz7WbFsKeyuqn9EaNEXucvEzQ'
    }
})

export default instance;