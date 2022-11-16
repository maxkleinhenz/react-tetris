package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter()

	hub := newHub()
	go hub.run()
	router.Path("/join").Queries("user", "{user}", "room", "{room}").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		joinRoom(hub, w, r)
	})

	log.Fatal(http.ListenAndServe(":9100", router))
}

type Room struct {
	name    string
	clients map[*Client]bool
}

type Broadcast struct {
	user    string
	room    string
	message []byte
}

// Hub maintains the set of active rooms and clients and broadcasts messages to the
// clients.
type MultiplayerHub struct {
	// Registered rooms
	rooms map[string]*Room

	// Inbound messages from the clients.
	broadcast chan Broadcast

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

func newHub() *MultiplayerHub {
	return &MultiplayerHub{
		broadcast:  make(chan Broadcast),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		rooms:      make(map[string]*Room),
	}
}

func (h *MultiplayerHub) run() {
	for {
		select {
		case client := <-h.register:

			if room, ok := h.rooms[client.room]; ok {
				room.clients[client] = true
			} else {
				room := Room{
					name: client.room, clients: map[*Client]bool{client: true},
				}
				h.rooms[client.room] = &room
			}

			fmt.Printf("%+v\n", h)

		case client := <-h.unregister:
			println("unregister client " + client.name)
			if room, ok := h.rooms[client.room]; ok {
				h.deleteClient(*room, client)
			}
		case broadcast := <-h.broadcast:
			println("broadcast message: ", broadcast.message)
			for client := range h.rooms[broadcast.room].clients {
				if client.name == broadcast.user {
					continue
				}

				println("broadcast message to client: " + client.name)
				select {
				case client.send <- broadcast.message:
				default:
					h.deleteClient(*h.rooms[client.room], client)
				}
			}
		}
	}
}

func (h *MultiplayerHub) deleteClient(room Room, client *Client) {
	delete(room.clients, client)
	if len(room.clients) == 0 {
		delete(h.rooms, room.name)
	}
	close(client.send)
}
