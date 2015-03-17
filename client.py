import web
render = web.template.render('templates/')
urls = (
    '/', 'index'
    '/viewer', 'viewer'
)

class index:
    def GET(self):
        return render.index()

class viewer:
    def GET(self):
        return render.client()

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()