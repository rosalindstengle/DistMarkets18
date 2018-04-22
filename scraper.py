from aio import ApiWrapper
from bs4 import BeautifulSoup as bs
from flask import Flask, jsonify, render_template

class CmcApiWrapper(ApiWrapper):
    BASE_URL = 'https://coinmarketcap.com'

    def get_volumes(self, currency):
        endpoint = '/currencies/{0}/#markets'.format(currency)
        response = self.get(endpoint)

        soup = bs(response.text, 'html.parser')
        table_body = soup.find('table', {'id': 'markets-table'}).find('tbody')
        rows = table_body.find_all('tr')

        volumes = []
        for row in rows:
            row_data = row.find_all('td')
            volumes.append({
                'exchange': row_data[1]['data-sort'],
                'pair': row_data[2]['data-sort'],
                'percentage': row_data[5]['data-sort']
            })
        return {"volumes": volumes}

cmc = CmcApiWrapper()

app = Flask(__name__, static_url_path='/static')

@app.route('/volumes/<currency>', methods=['GET'])
def get_volumes(currency):
    volumes = cmc.get_volumes(currency)

    return jsonify(volumes), 200


@app.route('/', methods=['GET'])
def home():
    return render_template('main.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
