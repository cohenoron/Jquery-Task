$('#all').on('click', getData)
$('#submit').on('click', filterData)

async function getData() {
  console.log('Getting data')
  const response = await fetchData('GET', 'https://restcountries.com/v3.1/all')
  const data = await response.json()
  createHtml(data)
}

async function filterData() {
  const search = $('#search').val()
  console.log(search)
  const response = await fetchData(
    'GET',
    `https://restcountries.com/v3.1/name/${search}`
  )
  const data = await response.json()
  createHtml(data)
}

function createHtml(countries) {
  let countAllResults = 0
  let SumPopulation = 0
  let countAmircaRegion = 0
  let countAsiaRegion = 0
  let countEuropeRegion = 0
  let countAfricaRegion = 0
  let countOceaniaRegion = 0
  let countAntarcticRegion = 0

  console.log(countries)
  const divCountries = $('#divCountries')
  divCountries.html('')

  for (const country of countries) {
    countAllResults++
    SumPopulation = SumPopulation + country.population
    if (country.region === 'Americas') {
      countAmircaRegion++
    }
    if (country.region === 'Europe') {
      countEuropeRegion++
    }
    if (country.region === 'Africa') {
      countAfricaRegion++
    }
    if (country.region === 'Asia') {
      countAsiaRegion++
    }
    if (country.region === 'Oceania') {
      countOceaniaRegion++
    }
    if (country.region === 'Antarctic') {
      countAntarcticRegion++
    }
  }

  const average = SumPopulation / countAllResults

  divCountries.append(
    `<h2>Total Population: ${SumPopulation}</h2>
<h2>Total Results: ${countAllResults} Countries</h2>
      <h2>Average Population: ${average} People Per Country  </h2>
      <h3>Division into Regions<h3>
      <table>
      <tr>
      </tr>
      </table>
      <table>
      <tr>
      <th>Region</th>
      <th>Number of Countries</th>
      </tr>
      <tr>
      <td>Americas</td>
      <td>${countAmircaRegion}</td>
      </tr>
      <tr>
      <td>Asia</td>
      <td>${countAsiaRegion}</td>
      </tr>
      <tr>
      <td>Europe</td>
      <td>${countEuropeRegion}</td>
      </tr>
      <tr>
      <td>Africa</td>
      <td>${countAfricaRegion}</td>
      </tr>
      <tr>
      <td>Oceania</td>
      <td>${countOceaniaRegion}</td>
      </tr>
      <tr>
      <td>Antarctic</td>
      <td>${countAntarcticRegion}</td>
      </tr>
      </table>`
  )
}

async function fetchData(method, url, data = null) {
  const fetchObj = {
    method,
  }

  if (method === 'POST') {
    fetchObj.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    }
    if (data) {
      fetchObj.body = JSON.stringify(data)
    }
  }

  return await fetch(url, fetchObj)
}

export { fetchData }
