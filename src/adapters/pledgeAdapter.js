import headers from './headers'

const ROOT_URL = process.env.REACT_APP_API_URL

class PledgeAdapter {

  // pledeData = {amount: num, project_id: int}
  static createPledge(pledgeData) {
    return fetch(`${ROOT_URL}/pledges`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(pledgeData)
    }).then(resp => resp.json())
  }

}

export default PledgeAdapter
