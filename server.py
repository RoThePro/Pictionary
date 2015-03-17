import tornado.web
import tornado.websocket
import tornado.ioloop

clients=[]

# This is our WebSocketHandler - it handles the messages
# from the tornado server
class WebSocketHandler(tornado.websocket.WebSocketHandler):
    # the client connected
	def open(self):
		clients.append(self)
		self.write_message("You are connected")

	# the client sent the message
	def on_message(self, message):
		for client in clients:
			client.write_message(message)

	# client disconnected
	def on_close(self):
		print "Client disconnected"

# start a new WebSocket Application
# use "/" as the root, and the 
# WebSocketHandler as our handler
application = tornado.web.Application([
    (r"/", WebSocketHandler),
])

# start the tornado server on port 8888
if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()