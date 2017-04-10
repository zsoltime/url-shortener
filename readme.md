# Free Code Camp: URL Shortener

Full stack Javascript app built for Free Code Camp's [URL Shortener Microservice][fcclink] challenge. Demo is available on [Heroku](https://sty.herokuapp.com/).

## User Stories

- [x] I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- [x] If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- [x] When I visit that shortened URL, it will redirect me to my original link.

## API Endpoints

| Method | Route | Description |
|:---:|:---| :---|
| GET | /shorten/:url | Create a short URL |
| GET | /:id | Redirects to the original URL |

[fcclink]: https://www.freecodecamp.com/challenges/url-shortener-microservice
