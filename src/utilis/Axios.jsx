import axios from "axios";

const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzZlZTdiYTU3ZmY4NWNlYjM2MTk5OTI5OGYyNTlkNCIsInN1YiI6IjY1ZTQzYzZlZmUwNzdhMDE2MjBmMDY1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UPkDemMeX12rxsVCs71648WvrfRawNq08_Om8QdD07E'
    }
})

export default instance;