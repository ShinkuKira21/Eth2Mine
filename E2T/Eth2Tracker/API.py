import requests
class API :
    def __init__(self, url) :
        self.response = None
        self.url = url

    def Connect(self):
        self.response = requests.get(self.url)

    def Result(self):
        return self.response.json()