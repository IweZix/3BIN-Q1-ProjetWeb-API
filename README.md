# Projet Web REST API

## Auths

| URI           | Méthode | Body | Action                                  |
|:--------------|:--------|:---------------------|:----------------------------------------|
| /verify       | POST    | {token}              | VERIFY : verify a user token         |
| /register     | POST    | {username, password} | CREATE ONE : add one user               |
| /login        | POST    | {username,password} | LOGIN : login a user                    |

## playlists

| URI           | Méthode | Body | Action                  |
|:--------------|:--------|:-----|:------------------------|
| /create       | POST    | {name}  | Create a playlist |
| /all          | GET     | N/A     | Get all playlist  |
| /:id          | GET     | N/A     | Get a plyslist by id |
| /:id          | DELETE  | N/A     | Delete a playlist by id  |
| /add/id       | POST    | {idPlaylist, idMusic}    | Add a song to a playlist|
| /delete/id    | DELETE  | {idPlaylist, idMusic}     | Remove a song from a playlist |

## spotify

| URI           | Méthode | Body | Action                  |
|:--------------|:--------|:-----|:------------------------|
| /tracks/:name/:artist       | GET         | N/A     | Get some tracks by name and artist                        |
| /tracks/:name       | GET        |  N/A    | Get some tracks by name                        |
| /images/:id       | GET        |  N/A    | Get some tracks by name                        |
